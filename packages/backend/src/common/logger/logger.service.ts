import { Injectable, LoggerService as ILoggerService } from '@nestjs/common';
import cliColor from 'cli-color';
import LoggerConfig from './logger.interface';
import LogLevels from './enum/log.level.enum';

@Injectable()
export default class LoggerService implements ILoggerService {
  private levels = Object.values(LogLevels);

  private printMessage: (
    message: string | Object,
    data: any,
    color: (s: string) => string,
    context: string,
    trace?: string
  ) => void;

  private enabledLevels: LogLevels[] = [];

  private defaultLevel = LogLevels.log;

  public constructor(config: LoggerConfig) {
    if (config.application.logOutput === 'json') {
      this.printMessage = this.printMessageAsJson;
    } else {
      this.printMessage = this.printMessageAsText;
    }

    let { logLevel } = config.application;
    if (!LogLevels[logLevel as LogLevels]) {
      this.warn(
        `Wrong log level: ${config.application.logLevel}, default level will be used (${this.defaultLevel})`,
        this.constructor.name,
        {}
      );
      logLevel = this.defaultLevel;
    }

    const levelIndex = this.levels.findIndex((level) => level === logLevel);
    if (process.env.NODE_ENV !== 'test') {
      this.enabledLevels = this.levels.slice(0, levelIndex + 1);
    }

    return new Proxy(this, {
      get(target, key: LogLevels): any {
        if (!target.levels.includes(key) || target.enabledLevels.includes(key)) {
          return target[key];
        }
        return (): void => undefined;
      },
    });
  }

  public error(error: string | Error, trace: string | undefined | null, context: string, data?: any): void {
    const { stack } = new Error();
    const stackArray = stack!.split('\n');
    const currentMethodIndex = stackArray.findIndex((str) => str.includes('Proxy.error'));
    const trimedStack = stackArray.slice(currentMethodIndex + 1).join('\n');
    const message = (error as Error).message || (error as string);

    this.printMessage(message, data, cliColor.red, context, trace || trimedStack);
  }

  public warn(message: any, context: string, data?: any): void {
    this.printMessage(message, data, cliColor.yellow, context);
  }

  public log(message: any, context: string, data?: any): void {
    this.printMessage(message, data, cliColor.green, context);
  }

  public verbose(message: any, context: string, data?: any): void {
    this.printMessage(message, data, cliColor.cyanBright, context);
  }

  public debug(message: any, context: string, data?: any): void {
    this.printMessage(message, data, cliColor.magentaBright, context);
  }

  private printMessageAsJson(message: string | Object, data = {}, color: (s: string) => string, context = ''): void {
    // NestJS can pass "data: true" argument through .log, .verbose .debug .warn methods.
    if (typeof data !== 'object') {
      // eslint-disable-next-line no-param-reassign
      data = {};
    }

    process.stdout.write(
      `${JSON.stringify({
        context,
        message,
        data,
        timestamp: Date.now(),
      })}\n`
    );
  }

  private printMessageAsText(
    message: string | Object,
    data: any,
    color: (s: string) => string,
    context = '',
    trace = ''
  ): void {
    const output =
      message && typeof message === 'object' ? `Object:\n${JSON.stringify(message, null, 2)}\n` : (message as string);
    const colorOutput = color(output);
    const timestamp = new Date().toISOString();
    const pidMessage = color(`[Nest] ${process.pid} - `);
    const contextMessage = context ? cliColor.yellow(`[${context}] `) : '';
    let fullMessage = `${pidMessage}${timestamp} ${contextMessage}${
      /\n$/.test(output) ? colorOutput : `${colorOutput}`
    }\n`;
    if (trace) {
      fullMessage += `${cliColor.red(trace)}\n`;
    }

    process.stdout.write(fullMessage);
  }
}
