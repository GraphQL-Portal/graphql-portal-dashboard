import { Catch, HttpServer, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'apollo-server-express';
import { MongoError } from 'mongodb';
import { LoggerService } from '../logger';

@Catch()
export default class ValidationExceptionFilter extends BaseExceptionFilter {
  public constructor(httpAdapter: HttpServer, private logger: LoggerService) {
    super(httpAdapter);
  }

  public catch(exception: any): any {
    if (exception.response?.statusCode === HttpStatus.NOT_FOUND) {
      this.logger.verbose(exception.response?.message, this.constructor.name);
      return;
    }
    if (exception instanceof ValidationError) {
      return exception;
    }
    if (exception instanceof MongoError) {
      let message = exception.message;
      if (exception.code === 11000) {
        message = `Duplicate key ${JSON.stringify(
          (exception as any).keyValue
        )}`;
        return new ValidationError(message);
      }
    }
    if (exception.stack.includes('Validation')) {
      const message =
        exception.response?.message?.toString() ||
        exception.message ||
        exception.toString();
      return new ValidationError(message);
    }

    this.logger.error(exception, exception.stack, 'ExceptionFilter');
    return exception;
  }
}
