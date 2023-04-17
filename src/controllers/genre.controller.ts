import express from 'express';
import axios from 'axios';

const cachedGenres: Genre[] = [];

const getGenre = async (_req: express.Request, res: express.Response): Promise<express.Response> => {
  if (cachedGenres.length > 0) {
    return res.json(cachedGenres);
  }

  try {
    const response = await axios.get(`${process.env.BASE_URL}/3/genre/movie/list?api_key=${process.env.API_KEY}`);

    const genres = response.data.genres;
    cachedGenres.push(...genres);

    return res.json(genres);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getGenre };
