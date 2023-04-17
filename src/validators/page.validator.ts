import { query } from 'express-validator';

const pageValidator = [query('page').optional().isInt({ min: 1 }).toInt()];

export default pageValidator;
