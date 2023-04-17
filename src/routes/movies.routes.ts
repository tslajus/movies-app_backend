import express from 'express';
import pageValidationRules from '../validators/page.validator';

import { getMovies } from '../controllers/movies.controller';

const router = express.Router();

router.route('/').get(pageValidationRules, getMovies);

export default router;
