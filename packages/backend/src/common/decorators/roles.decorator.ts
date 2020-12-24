import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';
import Metadata from '../enum/metadata.enum';

export default (roles: string[]): CustomDecorator<string> => SetMetadata(Metadata.ROLES, roles);
