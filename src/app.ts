import express, { ErrorRequestHandler, json } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import sanitize from 'express-mongo-sanitize';

import { connectToMongoDb, CORS, isLambdaRuntime } from './commons';
import healthRoutes from './routes/health.routes';
import moviesRoutes from './routes/movies.routes';
import movieDetailsRoutes from './routes/movieDetails.routes';
import genreRoutes from './routes/genre.routes';
import sortOptionsRoutes from './routes/sortOption.routes';
import userRoutes from './routes/user.routes';
import userLoginRoutes from './routes/userLogin.routes';

dotenv.config();

if (!isLambdaRuntime() && process.env.NODE_ENV !== 'test') {
  connectToMongoDb();
}

const app = express();

app.use(helmet());
app.use(json());
app.use(CORS);
app.use(sanitize());

app.use('/health', healthRoutes);
app.use('/movies', moviesRoutes);
app.use('/movies', movieDetailsRoutes);
app.use('/genres', genreRoutes);
app.use('/sort-options', sortOptionsRoutes);
app.use('/sign-up', userRoutes);
app.use('/login', userLoginRoutes);

const errorLogger: ErrorRequestHandler = (err, _req, _res, next) => {
  console.error(err.stack);
  next(err);
};
app.use(errorLogger);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ error: err.errors || err.message || 'Unknown Error' });
};
app.use(errorHandler);

app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Not found' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3001, () => {
    console.log('Application started');
  });
}

export default app;
