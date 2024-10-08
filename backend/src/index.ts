import 'reflect-metadata';
import cors from 'cors';
import { errors } from 'celebrate';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import AppError from './shared/errors/AppError';
import './shared/container';
import routes from './routes';
import { GetEnv } from './shared/getEnv/GetEnv';

const getEnv = GetEnv.getInstance();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line no-unused-vars
    _next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error,
        file:
          error.stack &&
          error.stack.split('\n')[1].trim().split(':')[0],
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error- ${error}`,
      file:
        error.stack &&
        error.stack.split('\n')[1].trim().split(':')[0],
    });
  },
);

app.listen(getEnv.backendPort, () => {
  /* eslint-disable no-console */
  console.log(
    `Example app listening at http://localhost:${getEnv.backendPort} 🔥`,
  );
});

export { app };
