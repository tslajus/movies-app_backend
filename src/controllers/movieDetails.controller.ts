import express from 'express';
import axios from 'axios';
import { movieDetailsConverter } from '../converters';

const cachedMovieDetails: CachedMovieDetails[] = [];

const getMovieDetails = async (req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    try {
      const movieId = req.params.movieId;
      const cachedMovie = cachedMovieDetails?.find((movie) => movie.movieId === movieId);

      if (cachedMovie) {
        return res.json(cachedMovie.movieDetails);
      }

      const response = await axios.get(`${process.env.BASE_URL}/3/movie/${movieId}?api_key=${process.env.API_KEY}`);
      const tmdbMovieDetails = response.data;
      const movieDetails: MovieDetails = movieDetailsConverter(tmdbMovieDetails);

      cachedMovieDetails.push({ movieId, movieDetails });

      return res.json(movieDetails);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getMovieDetails;
