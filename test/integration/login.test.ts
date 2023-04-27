import supertest from 'supertest';
import app from '../../src/app';
import { UserModel } from '../../src/models/user';
import { sha256 } from 'js-sha256';
import { connectToMongoDb } from '../../src/commons';
import mongoose from 'mongoose';

describe('Login API', () => {
  const existingUser = {
    name: 'Existing User',
    email: `eu-${Date.now()}@example.com`,
    password: 'Password1!',
  };

  beforeAll(async () => {
    const encryptedPassword = sha256(existingUser.password);
    await connectToMongoDb();
    await UserModel.create({ ...existingUser, password: encryptedPassword });
  });

  afterAll(async () => {
    await UserModel.deleteOne({ email: existingUser.email });
    await mongoose.connection.close();
  });

  describe('POST /login', () => {
    it('should log in a user with valid email and password', async () => {
      const credentials = {
        email: existingUser.email,
        password: existingUser.password,
      };

      const response = await supertest(app).post('/login').send(credentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error for invalid email or password', async () => {
      const invalidCredentials = {
        email: 'invalid@example.com',
        password: 'WrongPass1!',
      };

      const response = await supertest(app).post('/login').send(invalidCredentials);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });
  });
});
