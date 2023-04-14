import express from 'express';

import { getMovieDetails } from '../controllers/movieDetails.controller';

const router = express.Router();

router.route('/:movieId').get(getMovieDetails);

export default router;
