import supertest from 'supertest';
import app from '../../src/app';

describe('Movies API', () => {
  describe('GET /movies/:movieId', () => {
    it('should return movie details for a specific movie', async () => {
      const movieId = '507086';

      const response = await supertest(app).get(`/movies/${movieId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('movieId');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('releaseDate');
      expect(response.body).toHaveProperty('backdropPath');
      expect(response.body).toHaveProperty('posterPath');
      expect(response.body).toHaveProperty('voteAverage');
      expect(response.body).toHaveProperty('budget');
      expect(response.body).toHaveProperty('genres');
      expect(response.body).toHaveProperty('homepage');
      expect(response.body).toHaveProperty('originalLanguage');
      expect(response.body).toHaveProperty('originalTitle');
      expect(response.body).toHaveProperty('overview');
      expect(response.body).toHaveProperty('productionCompanies');
      expect(response.body).toHaveProperty('productionCountries');
      expect(response.body).toHaveProperty('revenue');
      expect(response.body).toHaveProperty('runtime');
      expect(response.body).toHaveProperty('spokenLanguages');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('tagline');
      expect(response.body).toHaveProperty('voteCount');
    });
  });
});
