import supertest from 'supertest';
import app from '../../src/app';

describe('Movies API', () => {
  describe('GET /movies', () => {
    it('should return a list of movies', async () => {
      const response = await supertest(app).get('/movies');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('totalPages');
      expect(response.body.movies).toBeInstanceOf(Array);
    });
  });
});
