import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'apollo-server-express';
import { MongoError } from 'mongodb';

@Catch()
export default class ValidationExceptionFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    if (exception instanceof MongoError) {
      let message = exception.message;
      if (exception.code === 11000) {
        message = `Duplicate key ${JSON.stringify((exception as any).keyValue)}`;
      }
      return new ValidationError(message);
    }

    return exception;
  }
}
