import { compose, getHead, objectKeys } from '../../../utils';
export const getHandlerKey = compose(getHead, objectKeys);
