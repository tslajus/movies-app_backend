import supertest from 'supertest';
import app from '../../src/app';
import { UserModel } from '../../src/models/user';
import { Movie } from '../../src/models/movie';
import { sha256 } from 'js-sha256';
import { connectToMongoDb } from '../../src/commons';
import mongoose from 'mongoose';

describe('Delete Personal Movies API', () => {
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

  beforeAll(async () => {
    const encryptedPassword = sha256(existingUser.password);
    await connectToMongoDb();
    await UserModel.create({ ...existingUser, password: encryptedPassword });

    const movie = new Movie({ ...testMovie, email: existingUser.email });
    await movie.save();
    movieId = movie._id;
  });

  afterAll(async () => {
    await UserModel.deleteOne({ email: existingUser.email });
    await mongoose.connection.close();
  });

  describe('DELETE /personal-movies/:id', () => {
    it('should successfully delete a personal movie', async () => {
      const loginResponse = await supertest(app)
        .post('/login')
        .send({ email: existingUser.email, password: existingUser.password });

      const token = loginResponse.body.token;

      const response = await supertest(app)
        .delete(`/personal-movies/${movieId}`)
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
        .delete(`/personal-movies/${new mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Movie not found');
    });
  });
});
