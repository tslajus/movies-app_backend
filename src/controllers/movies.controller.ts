import express from 'express';
import axios from 'axios';
import { movieConverter } from '../converters/movie.converter';

const cachedMovies: Record<number, Movies> = {};

const getMovies = async (req: express.Request, res: express.Response): Promise<express.Response> => {
  const page = parseInt(req.query.page as string, 10) || 1;

  try {
    const cachedMoviesPage = cachedMovies[page];

    if (cachedMoviesPage) {
      return res.json(cachedMoviesPage);
    }

    const response = await axios.get(
      `${process.env.BASE_URL}/3/discover/movie?sort_by=popularity.desc&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY_MOVIES}`,
    );
    const tmdbMovies = response.data.results;
    const movies: Movies = {
      page,
      totalPages: response.data.total_pages,
      movies: tmdbMovies.map(movieConverter),
    };

    cachedMovies[page] = movies;

    return res.json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getMovies };
