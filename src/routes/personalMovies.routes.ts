import express from 'express';
import { movieValidator } from '../validators';
import { authenticate } from '../services';
import { addPersonalMovie } from '../controllers';

const router = express.Router();

router.post('/', authenticate, movieValidator, addPersonalMovie);

export default router;
