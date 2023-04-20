import express from 'express';
import mongoose from 'mongoose';

const getHealth = (_req: express.Request, res: express.Response): void => {
  res.json({
    health: true,
    version: 'v0.2',
    mongo: mongoose.connection.readyState > 0,
  });
};

export default getHealth;
