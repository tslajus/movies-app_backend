import supertest from 'supertest';
import app from '../../src/app';
import { UserModel } from '../../src/models/user';
import { Movie } from '../../src/models/movie';
import { sha256 } from 'js-sha256';
import '../testSetup';

describe('My Movies API', () => {
  let existingUser = {
    name: 'Existing User',
    email: `eu-${Date.now()}@example.com`,
    password: 'Password1!',
  };

  const testMovies = [
    {
      movieId: 12345,
      title: 'Example Movie 1',
      releaseDate: '2023-04-27',
      backdropPath: 'https://image.tmdb.org/t/p/w500/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg',
      posterPath: 'https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
      voteAverage: 6.5,
    },
    {
      movieId: 67890,
      title: 'Example Movie 2',
      releaseDate: '2023-05-01',
      backdropPath: 'https://image.tmdb.org/t/p/w500/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
      posterPath: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
      voteAverage: 7.5,
    },
  ];

  beforeEach(async () => {
    existingUser = {
      name: 'Existing User',
      email: `eu-${Date.now()}@example.com`,
      password: 'Password1!',
    };

    const encryptedPassword = sha256(existingUser.password);
    await UserModel.create({ ...existingUser, password: encryptedPassword });
    for (const testMovie of testMovies) {
      const movie = new Movie({ ...testMovie, email: existingUser.email });
      await movie.save();
    }
  });

  afterEach(async () => {
    await UserModel.deleteOne({ email: existingUser.email });
    await Movie.deleteMany({ email: existingUser.email });
  });

  describe('GET /my-movies', () => {
    it('should successfully get all personal movies', async () => {
      const loginResponse = await supertest(app)
        .post('/login')
        .send({ email: existingUser.email, password: existingUser.password });

      const token = loginResponse.body.token;

      const response = await supertest(app).get('/my-movies').set('Authorization', `Bearer ${token}`).expect(200);

      expect(response.body.movies).toHaveLength(testMovies.length);
      expect(response.body.totalPages).toBe(1);
      for (let i = 0; i < testMovies.length; i++) {
        const foundMovie = response.body.movies.find((movie: Movie) => movie.movieId === testMovies[i].movieId);
        expect(foundMovie).toMatchObject({
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
        .get('/my-movies?page=notanumber')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.movies).toHaveLength(testMovies.length);
      expect(response.body.totalPages).toBe(1);
      for (let i = 0; i < testMovies.length; i++) {
        const foundMovie = response.body.movies.find((movie: Movie) => movie.movieId === testMovies[i].movieId);
        expect(foundMovie).toMatchObject({
          movieId: testMovies[i].movieId,
          title: testMovies[i].title,
          releaseDate: new Date(testMovies[i].releaseDate).toISOString(),
        });
      }
    });
  });
});
