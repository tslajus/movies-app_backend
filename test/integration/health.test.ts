import httpStatus from 'http-status';
import supertest from 'supertest';

import app from '../../src/app';

const expectedResponse = {
  health: true,
  version: 'v0.1',
};

describe('Health API', () => {
  const request = supertest(app);

  describe('GET /health', () => {
    it('should return health status', (done) => {
      request
        .get('/health')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).toEqual(expectedResponse);
          done();
        })
        .catch(done);
    });
  });
});
