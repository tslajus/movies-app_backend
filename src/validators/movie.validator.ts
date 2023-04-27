import { body } from 'express-validator';

const movieValidator = [
  body('movieId').isNumeric().withMessage('movieId must be a number'),
  body('title').notEmpty().withMessage('title is required'),
  body('releaseDate').isISO8601().withMessage('releaseDate must be a valid date'),
];

export default movieValidator;
