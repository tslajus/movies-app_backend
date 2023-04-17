import { check } from 'express-validator';

const titleValidator = [
  check('title')
    .matches(/^[a-zA-Z0-9\s\-.]+$/)
    .withMessage('Title can only contain letters, numbers, spaces, dashes, and dots'),
];

export default titleValidator;
