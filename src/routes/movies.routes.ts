import express from 'express';
import { pageValidator, genreValidator } from '../validators';

import { getMovies } from '../controllers';

const router = express.Router();

router.route('/').get(pageValidator, genreValidator, getMovies);

export default router;
