import supertest from 'supertest';
import app from '../../src/app';
import { UserModel } from '../../src/models/user';
import { Movie } from '../../src/models/movie';
import { sha256 } from 'js-sha256';
import '../testSetup';

describe('Add My Movies API', () => {
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

  beforeAll(async () => {
    const encryptedPassword = sha256(existingUser.password);
    await UserModel.create({ ...existingUser, password: encryptedPassword });
  });

  afterAll(async () => {
    await UserModel.deleteOne({ email: existingUser.email });
    await Movie.deleteOne({ movieId: testMovie.movieId });
  });

  describe('POST /my-movies', () => {
    it('should successfully create a movie', async () => {
      const loginResponse = await supertest(app)
        .post('/login')
        .send({ email: existingUser.email, password: existingUser.password });

      const token = loginResponse.body.token;

      const response = await supertest(app).post('/my-movies').set('Authorization', `Bearer ${token}`).send(testMovie);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Movie saved successfully');
      expect(response.body.movie).toMatchObject({
        movieId: testMovie.movieId,
        title: testMovie.title,
        releaseDate: /2023-04-27/,
      });
    });
  });
});
