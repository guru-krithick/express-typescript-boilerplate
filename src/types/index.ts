import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ErrorResponse {
  status: number;
  message: string;
  stack?: string;
}

export interface SuccessResponse<T> {
  status: number;
  data: T;
  message?: string;
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;