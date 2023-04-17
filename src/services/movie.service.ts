import axios from 'axios';
import { movieConverter } from '../converters/movie.converter';

async function searchMoviesByTitle({ title, page }: SearchMoviesByTitleParams) {
  const url = `${process.env.BASE_URL}/3/search/movie?query=${title}&page=${page}&api_key=${process.env.API_KEY_MOVIES}`;

  const response = await axios.get(url);
  const tmdbMovies = response.data.results;
  const movies = tmdbMovies.map(movieConverter);

  return movies;
}

export { searchMoviesByTitle };
