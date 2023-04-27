import express from 'express';
import { movieValidator } from '../validators';
import { authenticate } from '../services';
import { addPersonalMovie, getPersonalMovies } from '../controllers';

const router = express.Router();

router.post('/', authenticate, movieValidator, addPersonalMovie);
router.get('/', authenticate, getPersonalMovies);

export default router;
