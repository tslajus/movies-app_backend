import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Movie } from '../models/movie';
import { PAGE_SIZE } from '../commons';

const addPersonalMovie = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const movie = new Movie({ ...req.body, email: req.currentUserEmail });
  await movie.save();
  res.status(201).json({ message: 'Movie saved successfully', movie });
};

const getPersonalMovies = async (req: Request, res: Response) => {
  try {
    const userEmail = req.currentUserEmail;
    const page = parseInt(req.query.page as string) || 1;

    const { docs: movies, totalPages } = await Movie.paginate(
      { email: userEmail },
      { offset: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE, sort: { createdAt: -1 } },
    );

    res.status(200).json({ movies, totalPages });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const deletePersonalMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const userEmail = req.currentUserEmail;

    const result = await Movie.deleteOne({ movieId: movieId, email: userEmail });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export { addPersonalMovie, getPersonalMovies, deletePersonalMovie };
