import supertest from 'supertest';
import app from '../../src/app';
import { UserModel } from '../../src/models/user';
import { Movie } from '../../src/models/movie';
import { sha256 } from 'js-sha256';
import { connectToMongoDb } from '../../src/commons';
import mongoose from 'mongoose';

describe('Personal Movies API', () => {
  const existingUser = {
    name: 'Existing User',
    email: `eu-${Date.now()}@example.com`,
    password: 'Password1!',
  };

  const testMovies = [
    { movieId: 12345, title: 'Example Movie 1', releaseDate: '2023-04-27' },
    { movieId: 67890, title: 'Example Movie 2', releaseDate: '2023-05-01' },
  ];

  beforeAll(async () => {
    const encryptedPassword = sha256(existingUser.password);
    await connectToMongoDb();
    await UserModel.create({ ...existingUser, password: encryptedPassword });
    for (const testMovie of testMovies) {
      const movie = new Movie({ ...testMovie, email: existingUser.email });
      await movie.save();
    }
  });

  afterAll(async () => {
    await UserModel.deleteOne({ email: existingUser.email });
    await Movie.deleteMany({ email: existingUser.email });
    await mongoose.connection.close();
  });

  describe('GET /personal-movies', () => {
    it('should successfully get all personal movies', async () => {
      const loginResponse = await supertest(app)
        .post('/login')
        .send({ email: existingUser.email, password: existingUser.password });

      const token = loginResponse.body.token;

      const response = await supertest(app).get('/personal-movies').set('Authorization', `Bearer ${token}`).expect(200);

      expect(response.body.movies).toHaveLength(testMovies.length);
      expect(response.body.totalPages).toBe(1);
      for (let i = 0; i < testMovies.length; i++) {
        expect(response.body.movies[i]).toMatchObject({
          movieId: testMovies[i].movieId,
          title: testMovies[i].title,
          releaseDate: new Date(testMovies[i].releaseDate).toISOString(),
        });
      }
    });

    it('should use default page value if page query parameter is not a number', async () => {
      const loginResponse = await supertest(app)
        .post('/login')
        .send({ email: existingUser.email, password: existingUser.password });

      const token = loginResponse.body.token;

      const response = await supertest(app)
        .get('/personal-movies?page=notanumber')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.movies).toHaveLength(testMovies.length);
      expect(response.body.totalPages).toBe(1);
      for (let i = 0; i < testMovies.length; i++) {
        expect(response.body.movies[i]).toMatchObject({
          movieId: testMovies[i].movieId,
          title: testMovies[i].title,
          releaseDate: new Date(testMovies[i].releaseDate).toISOString(),
        });
      }
    });
  });
});
