import { query } from 'express-validator';

const pageValidationRules = [query('page').optional().isInt({ min: 1 }).toInt()];

export default pageValidationRules;
