import express from 'express';
import axios from 'axios';
import { validateRequest } from '../commons';
import { titleValidator, genreValidator, sortOptionValidator } from '../validators';
import { movieConverter } from '../converters';

const cachedMovies: Record<number, Movies> = {};

const getMovies = async (req: express.Request, res: express.Response): Promise<express.Response> => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const title = req.query.title as string;
  const genres = req.query.genres as string;
  const sort = req.query.sort as string;

  let url = `${process.env.BASEURL}/3/discover/movie?page=${page}&vote_count.gte=1000&api_key=${process.env.APIKEY}`;

  if (title && !sort && !genres) {
    const titleError = await validateRequest(titleValidator, req);
    if (titleError) {
      return res.status(400).json(titleError);
    }
    url = `${process.env.BASEURL}/3/search/movie?query=${title}&page=${page}&api_key=${process.env.APIKEY}`;
  }

  if (sort) {
    const isValidSortOption = sortOptionValidator(sort);
    if (!isValidSortOption) {
      return res.status(400).json({ error: 'Invalid sort option' });
    }
    url += `&sort_by=${sort}`;
  } else {
    url += '&sort_by=popularity.desc';
  }

  if (genres) {
    const genreError = await validateRequest(genreValidator, req);
    if (genreError) {
      return res.status(400).json(genreError);
    }
    url += `&with_genres=${genres}`;
  }

  try {
    const cachedMoviesPage = cachedMovies[page];

    if (cachedMoviesPage && !title && !sort && !genres) {
      return res.json(cachedMoviesPage);
    }

    const response = await axios.get(url);
    const tmdbMovies = response.data.results;

    const movies: Movies = {
      page: page,
      totalPages: response.data.total_pages,
      movies: tmdbMovies.map(movieConverter),
    };

    if (!title && !sort && !genres) {
      cachedMovies[page] = movies;
    }

    return res.json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getMovies;
