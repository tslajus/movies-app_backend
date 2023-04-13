import express from 'express';
import movieList from '../../dist/src/data/movieList.json';
import movie from '../../dist/src/data/movie.json';

const getMovies = (_req: express.Request, res: express.Response): void => {
  const movies: Movies = movieList;
  res.json(movies);
};

const getMovieDetails = (_req: express.Request, res: express.Response): void => {
  const movieDetails: MovieDetails = movie;
  res.json(movieDetails);
};

export { getMovies, getMovieDetails };
