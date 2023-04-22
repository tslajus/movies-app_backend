import axios from 'axios';
import { movieConverter } from '../converters';

const searchMoviesByTitle = async ({ title, page }: SearchMoviesByTitleParams) => {
  const url = `${process.env.BASE_URL}/3/search/movie?query=${title}&page=${page}&api_key=${process.env.API_KEY}`;
  try {
    const response = await axios.get(url);
    const tmdbMovies = response.data.results;

    const movies: Movies = {
      page: page,
      totalPages: response.data.total_pages,
      movies: tmdbMovies.map(movieConverter),
    };

    return movies;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

export default searchMoviesByTitle;
