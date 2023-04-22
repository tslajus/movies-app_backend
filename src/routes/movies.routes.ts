import express from 'express';
import { pageValidator } from '../validators';

import { getMovies } from '../controllers';

const router = express.Router();

router.route('/').get(pageValidator, getMovies);

export default router;
