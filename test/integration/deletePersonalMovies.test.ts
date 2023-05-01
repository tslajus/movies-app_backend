import supertest from 'supertest';
import app from '../../src/app';
import { UserModel } from '../../src/models/user';
import { Movie } from '../../src/models/movie';
import { sha256 } from 'js-sha256';
import '../testSetup';

describe('Delete My Movies API', () => {
  const existingUser = {
    name: 'Existing User',
    email: `eu-${Date.now()}@example.com`,
    password: 'Password1!',
  };

  const testMovie = {
    movieId: 12345,
    title: 'Example Movie',
    releaseDate: '2023-04-27',
  };

  let movieId: string;

  beforeEach(async () => {
    const encryptedPassword = sha256(existingUser.password);
    await UserModel.create({ ...existingUser, password: encryptedPassword });

    const movie = new Movie({ ...testMovie, email: existingUser.email });
    await movie.save();
  });

  afterEach(async () => {
    await UserModel.deleteOne({ email: existingUser.email });
    await Movie.deleteOne({ movieId });
  });

  describe('DELETE /my-movies/:id', () => {
    it('should successfully delete a personal movie', async () => {
      const loginResponse = await supertest(app)
        .post('/login')
        .send({ email: existingUser.email, password: existingUser.password });

      const token = loginResponse.body.token;

      const response = await supertest(app)
        .delete(`/my-movies/${testMovie.movieId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });

    it('should return 404 if the movie is not found', async () => {
      const loginResponse = await supertest(app)
        .post('/login')
        .send({ email: existingUser.email, password: existingUser.password });

      const token = loginResponse.body.token;

      const response = await supertest(app)
        .delete(`/my-movies/${testMovie.movieId + 1}`)
        .set('Authorization', `Bearer ${token}`);

      console.log('Response body:', response.body);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Movie not found');
    });
  });
});
