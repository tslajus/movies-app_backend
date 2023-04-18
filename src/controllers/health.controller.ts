import express from 'express';

const getHealth = (_req: express.Request, res: express.Response): void => {
  res.json({
    health: true,
    version: 'v0.1',
  });
};

export default getHealth;
