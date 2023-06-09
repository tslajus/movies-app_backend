import { connectToMongoDb } from '../../src/commons';
import supertest from 'supertest';
import app from '../../src/app';
import { UserModel } from '../../src/models/user';
import mongoose from 'mongoose';

beforeAll(async () => {
  await connectToMongoDb();
});

afterEach(async () => {
  await UserModel.deleteMany({ email: /@example.com$/ });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('SignUp API', () => {
  describe('POST /sign-up', () => {
    it('should create a new user with valid data', async () => {
      const user = {
        name: 'Test Name',
        email: `eu-${Date.now()}@example.com`,
        password: 'Password1!',
      };

      const response = await supertest(app).post('/sign-up').send(user);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'User created successfully');
    });

    it('should return an error for invalid data', async () => {
      const invalidUser = {
        name: 'Name',
        email: 'invalidemail',
        password: 'short',
      };

      const response = await supertest(app).post('/sign-up').send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBeInstanceOf(Array);
    });
  });
});
