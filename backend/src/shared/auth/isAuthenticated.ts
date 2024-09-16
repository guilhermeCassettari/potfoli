import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { GetEnv } from '../getEnv/GetEnv';
import AppError from '../errors/AppError';

interface ITokenPayload {
  sub: string;
}
export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  const getEnv = GetEnv.getInstance();

  if (!authHeader) {
    throw new AppError('JWT Token not found');
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('JWT Token not found 2');
  }

  try {
    const decodedToken = verify(token, getEnv.jwtSecret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
