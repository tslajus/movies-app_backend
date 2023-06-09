import axios from 'axios';
import { movieConverter } from '../converters';

const searchMoviesByGenre = async ({ genres, page }: { genres: string; page: number }): Promise<Movies> => {
  try {
    const response = await axios.get(
      `${process.env.BASEURL}/3/discover/movie?with_genres=${genres}&page=${page}&vote_count.gte=1000&api_key=${process.env.APIKEY}`,
    );

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

export default searchMoviesByGenre;
