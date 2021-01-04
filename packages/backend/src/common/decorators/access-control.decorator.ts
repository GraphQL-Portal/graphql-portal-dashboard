import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';
import AccessControlModels from '../enum/access-control-models.enum';
import Metadata from '../enum/metadata.enum';

export default (model: AccessControlModels, pathToId?: string): CustomDecorator<string> => SetMetadata(Metadata.ACCESS, {
  model,
  pathToId,
});
