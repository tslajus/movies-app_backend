import httpStatus from 'http-status';
import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';

const expectedResponse = {
  health: true,
  version: 'v0.2',
  mongo: true,
};

describe('Health API', () => {
  const request = supertest(app);

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request.get('/health').expect(httpStatus.OK);
      expect(res.body).toEqual(expectedResponse);
    });
  });
});
