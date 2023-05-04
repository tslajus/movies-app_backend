import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { ValidationChain, validationResult } from 'express-validator';

dotenv.config();

export const PAGE_SIZE = 20;

export const allowedOrigins = [process.env.ALLOWEDORIGIN1 as string, process.env.ALLOWEDORIGIN2 as string];

export const CORS = cors({
  origin: allowedOrigins,
  allowedHeaders: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

export const validate = (validations: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

export const validateRequest = async (validation: ValidationChain[], req: express.Request) => {
  await Promise.all(validation.map((validator) => validator.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { error: errors.array() };
  }
  return null;
};

export const isLambdaRuntime = (): boolean => !!process.env.AWS_LAMBDA_FUNCTION_NAME;

export const connectToMongoDb = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionOptions: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (process.env.MONGOURL) {
    mongoose.connect(process.env.MONGOURL, connectionOptions);
  } else {
    console.error('Mongo URL not found');
  }
};
