import express from 'express';
import { sha256 } from 'js-sha256';
import { validateRequest } from '../commons';
import { userValidator } from '../validators';
import { UserModel } from '../models/user';

const createUser = async (req: express.Request, res: express.Response): Promise<express.Response> => {
  const { name, email, password } = req.body;

  const validationErrors = await validateRequest(userValidator, req);
  if (validationErrors) {
    return res.status(400).json(validationErrors);
  }

  const encryptedPassword = sha256(password);

  const newUser: InstanceType<typeof UserModel> = new UserModel({
    name,
    email,
    password: encryptedPassword,
  });

  try {
    await newUser.save();
    return res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
  }
};

export default createUser;
