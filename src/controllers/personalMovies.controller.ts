import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Movie } from '../models/movie';

const addPersonalMovie = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const movie = new Movie({ ...req.body, email: req.currentUserEmail });
  await movie.save();
  res.status(201).json({ message: 'Movie saved successfully', movie });
};

export default addPersonalMovie;
