import express from 'express';
import userLoginValidator from '../validators/userLogin.validator';
import { login } from '../controllers';

const router = express.Router();

router.post('/', userLoginValidator, login);

export default router;
