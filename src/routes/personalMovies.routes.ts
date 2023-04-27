import express from 'express';
import { movieValidator } from '../validators';
import { authenticate } from '../services';
import { addPersonalMovie, deletePersonalMovie, getPersonalMovies } from '../controllers';

const router = express.Router();

router.post('/', authenticate, movieValidator, addPersonalMovie);
router.get('/', authenticate, getPersonalMovies);
router.delete('/:id', authenticate, deletePersonalMovie);

export default router;
