import { query } from 'express-validator';

export const genreValidator = [
  query('genres')
    .exists()
    .withMessage('genres parameter is required')
    .isString()
    .withMessage('genres must be a string')
    .matches(/^\d+(,\d+)*$/)
    .withMessage('genres must be comma-separated numbers'),
];

export default genreValidator;
