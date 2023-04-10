import express from 'express';
import movieList from '../../dist/src/data/movieList.json';

const router = express.Router();

const movies = movieList.movies;

router.route('/').get((_req, res) => {
  res.json(movies);
});

export default router;
