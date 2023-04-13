import express from 'express';
import axios from 'axios';
import { movieConverter } from '../converters/movie.converter';

import movie from '../../dist/src/data/movie.json';

const getMovies = async (_req: express.Request, res: express.Response): Promise<void> => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}${process.env.API_KEY}`);
    const tmdbMovies = response.data.results;
    const movies: Movies = {
      page: 1,
      totalPages: response.data.total_pages,
      movies: tmdbMovies.map(movieConverter),
    };
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMovieDetails = (_req: express.Request, res: express.Response): void => {
  const movieDetails: MovieDetails = movie;
  res.json(movieDetails);
};

export { getMovies, getMovieDetails };
