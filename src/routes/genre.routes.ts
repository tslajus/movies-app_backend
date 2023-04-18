import express from 'express';

import { getGenre } from '../controllers';

const router = express.Router();

router.route('/').get(getGenre);

export default router;
