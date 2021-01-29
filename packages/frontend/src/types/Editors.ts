import { Source, Title } from './General';
import { ErrorsAndControl } from './HookForm';

export type Editors = ErrorsAndControl & Title & Source & { name: string };
