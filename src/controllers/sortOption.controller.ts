import express from 'express';
import { sortOptionService } from '../services/sortOption.service';

const getSortOptions = async (_req: express.Request, res: express.Response): Promise<express.Response> => {
  try {
    const sortOptions = await sortOptionService();
    return res.json(sortOptions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getSortOptions };
