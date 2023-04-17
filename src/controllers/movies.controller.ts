import express from 'express';
import axios from 'axios';
import { validationResult } from 'express-validator';
import { titleValidator } from '../validators/title.validator';
import { movieConverter } from '../converters/movie.converter';
import { searchMoviesByTitle } from '../services/movie.service';

const cachedMovies: Record<number, Movies> = {};

const getMovies = async (req: express.Request, res: express.Response): Promise<express.Response> => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const title = req.query.title as string;

  if (title) {
    await Promise.all(titleValidator.map((validator) => validator.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const movies = await searchMoviesByTitle({ title, page });
    return res.json(movies);
  }

  try {
    const cachedMoviesPage = cachedMovies[page];

    if (cachedMoviesPage && !title) {
      return res.json(cachedMoviesPage);
    }

    const response = await axios.get(
      `${process.env.BASE_URL}/3/discover/movie?sort_by=popularity.desc&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY}`,
    );
    const tmdbMovies = response.data.results;
    const movies: Movies = {
      page: page,
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
