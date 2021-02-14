import { ElementsTable } from '../../../types';
import { ICON_MAPPER } from './constants';
import { TYPE_MAPPER } from './constants';

const getIcon = (mapper: ElementsTable) => (key: string) => mapper[key] || null;
export const handlerMapper = getIcon(ICON_MAPPER);
export const typeMapper = getIcon(TYPE_MAPPER);
