import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from 'cors';
import { errors } from 'celebrate';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import path from 'path';
import AppError from './shared/errors/AppError';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
const port = process.env.BACKEND_PORT;

const app = express();

app.use(cors());
app.use(express.json());

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
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Example app listening at http://localhost:${port}`);
});
