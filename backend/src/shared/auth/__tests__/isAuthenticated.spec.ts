import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { GetEnv } from '../../getEnv/GetEnv';
import isAuthenticated from '../isAuthenticated';
import AppError from '../../errors/AppError';
jest.mock('jsonwebtoken');
jest.mock('../../getEnv/GetEnv');

describe('isAuthenticated Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {};
    mockNext = jest.fn();

    (GetEnv.getInstance as jest.Mock).mockReturnValue({
      jwtSecret: 'test-secret',
    });
  });

  it('should throw an error if no authorization header is present', () => {
    expect(() => {
      isAuthenticated(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );
    }).toThrow('JWT Token not found');
  });

  it('should throw an error if no token is present in authorization header', () => {
    mockRequest.headers!.authorization = 'Bearer ';

    expect(() => {
      isAuthenticated(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );
    }).toThrow('JWT Token not found');
  });

  it('should throw an error if token is invalid', () => {
    mockRequest.headers!.authorization = 'Bearer invalid-token';

    (verify as jest.Mock).mockImplementation(() => {
      throw new AppError('Invalid token');
    });

    expect(() => {
      isAuthenticated(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );
    }).toThrow(AppError);
  });

  it('should call next function if token is valid', () => {
    mockRequest.headers!.authorization = 'Bearer valid-token';

    (verify as jest.Mock).mockReturnValue({
      sub: 'user-id',
    });

    isAuthenticated(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );

    expect(mockRequest.user).toEqual({ id: 'user-id' });
    expect(mockNext).toHaveBeenCalled();
  });
});
