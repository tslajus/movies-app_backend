import express from 'express';
import { validate } from '../commons';
import { userValidator } from '../validators';
import { createUser } from '../controllers';

const router = express.Router();

router.post('/', validate(userValidator), createUser);

export default router;
