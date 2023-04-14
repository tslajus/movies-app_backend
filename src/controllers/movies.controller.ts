import express from 'express';
import axios from 'axios';
import { movieConverter } from '../converters/movie.converter';

let cachedMovies: Movies;

const getMovies = async (_req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    if (cachedMovies) {
      return res.json(cachedMovies);
    }

    const response = await axios.get(
      `${process.env.BASE_URL}/3/discover/movie?sort_by=popularity.desc&page=1&vote_count.gte=1000&api_key=${process.env.API_KEY_MOVIES}`,
    );
    const tmdbMovies = response.data.results;
    const movies: Movies = {
      page: 1,
      totalPages: response.data.total_pages,
      movies: tmdbMovies.map(movieConverter),
    };

    cachedMovies = movies;

    return res.json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getMovies };
