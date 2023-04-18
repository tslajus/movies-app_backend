import express from 'express';

import { getMovieDetails } from '../controllers';

const router = express.Router();

router.route('/:movieId').get(getMovieDetails);

export default router;
