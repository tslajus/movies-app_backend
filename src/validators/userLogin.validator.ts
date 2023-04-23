import { check, ValidationChain } from 'express-validator';

const userLoginValidator: ValidationChain[] = [
  check('email').trim().not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),

  check('password').trim().not().isEmpty().withMessage('Password is required'),
];

export default userLoginValidator;
