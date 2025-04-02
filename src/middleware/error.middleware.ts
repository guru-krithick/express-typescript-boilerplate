import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';
import logger from '../utils/logger';
import config from '../config';

class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
    );

    const errorResponse: ErrorResponse = {
      status,
      message,
    };

    // Add stack trace in development mode
    if (config.env === 'development') {
      errorResponse.stack = error.stack;
    }

    res.status(status).json(errorResponse);
  } catch (error) {
    next(error);
  }
};

export { HttpException, errorMiddleware };