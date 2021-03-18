import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'apollo-server-express';
import { MongoError } from 'mongodb';

@Catch()
export default class ValidationExceptionFilter extends BaseExceptionFilter {
  public catch(exception: any): any {
    if (exception instanceof ValidationError) {
      return exception;
    }
    if (exception instanceof MongoError) {
      let message = exception.message;
      if (exception.code === 11000) {
        message = `Duplicate key ${JSON.stringify(
          (exception as any).keyValue
        )}`;
      }
      return new ValidationError(message);
    }
    if (exception.stack.includes('Validation')) {
      const message =
        exception.response?.message?.toString() ||
        exception.message ||
        exception.toString();
      return new ValidationError(message);
    }

    return exception;
  }
}
