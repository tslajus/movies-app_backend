import express from 'express';

import { getSortOptions } from '../controllers/sortOption.controller';

const router = express.Router();

router.route('/').get(getSortOptions);

export default router;
