import express from 'express';
import axios from 'axios';
import { validateRequest } from '../commons';
import { titleValidator, genreValidator, sortOptionValidator } from '../validators';
import { movieConverter } from '../converters';
import { searchMoviesByTitle, searchMoviesByGenre } from '../services';

const cachedMovies: Record<number, Movies> = {};

const getMovies = async (req: express.Request, res: express.Response): Promise<express.Response> => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const title = req.query.title as string;
  const genres = req.query.genres as string;
  const sort = req.query.sort as string;

  if (title) {
    const titleError = await validateRequest(titleValidator, req);
    if (titleError) {
      return res.status(400).json(titleError);
    }
    const movies = await searchMoviesByTitle({ title, page });
    return res.json(movies);
  }

  if (genres) {
    const genreError = await validateRequest(genreValidator, req);
    if (genreError) {
      return res.status(400).json(genreError);
    }
    const movies = await searchMoviesByGenre({ genres, page });
    return res.json(movies);
  }

  try {
    const cachedMoviesPage = cachedMovies[page];

    if (cachedMoviesPage && !title && !sort) {
      return res.json(cachedMoviesPage);
    }

    let url = `${process.env.BASE_URL}/3/discover/movie?sort_by=popularity.desc&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY}`;

    if (sort) {
      const isValidSortOption = sortOptionValidator(sort);
      if (!isValidSortOption) {
        return res.status(400).json({ error: 'Invalid sort option' });
      }
      url = `${process.env.BASE_URL}/3/discover/movie?sort_by=${sort}&with_genres=${genres}&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY}`;
    }

    const response = await axios.get(url);
    const tmdbMovies = response.data.results;

    const movies: Movies = {
      page: page,
      totalPages: response.data.total_pages,
      movies: tmdbMovies.map(movieConverter),
    };

    if (!title && !sort) {
      cachedMovies[page] = movies;
    }

    return res.json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getMovies;
