import express from 'express';

import { getMovieDetails, getMovies } from '../controllers/movies.controller';

const router = express.Router();

router.route('/').get(getMovies);
router.route('/:movieId').get(getMovieDetails);

export default router;
