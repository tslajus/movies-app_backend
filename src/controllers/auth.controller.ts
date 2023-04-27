import express from 'express';
import { sha256 } from 'js-sha256';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';

const login = async (req: express.Request, res: express.Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(400).send({ message: 'Invalid email or password' });
    return;
  }

  const providedPasswordEncryption = sha256(password);
  const isPasswordValid = providedPasswordEncryption === user.password;

  if (!isPasswordValid) {
    res.status(400).send({ message: 'Invalid email or password' });
    return;
  }

  const token = jwt.sign({ currentUserEmail: email }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  res.status(200).send({ token });
};

export default login;