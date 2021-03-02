import {
  CUSTOM_HANDLER_TO_PACKAGE,
  PACKAGE_TO_CUSTOM_HANDLER,
} from '../constants';

export const getPackageName = (handlerName: string) =>
  CUSTOM_HANDLER_TO_PACKAGE[handlerName] || handlerName;

export const getHandlerName = (packageName: string) =>
  PACKAGE_TO_CUSTOM_HANDLER[packageName] || packageName;
