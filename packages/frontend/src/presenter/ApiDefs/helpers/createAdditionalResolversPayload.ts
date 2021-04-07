import {
  AdditionalResolver,
  AdditionalResolverForm,
  ApiDef,
} from '../../../types';
import {
  arrayObjectToObject,
  objectToFieldArray,
} from '../../DataSources/helpers';

export const createAdditionalResolversPayload = (
  data: AdditionalResolverForm,
  mesh: Object = {}
) => {
  if (!data.mesh?.additionalResolvers) {
    return { ...mesh, additionalResolvers: [], additionalTypeDefs: [] };
  }

  const nextAdditionalResolvers = data.mesh.additionalResolvers?.reduce(
    (
      { additionalResolvers, additionalTypeDefs },
      {
        field,
        fieldType,
        type,
        targetMethod,
        targetSource,
        requiredSelectionSet,
        args,
        returnData,
      },
      idx: number
    ) => {
      additionalResolvers[idx] = {
        type,
        field,
        targetMethod,
        targetSource,
        requiredSelectionSet,
        args: arrayObjectToObject(args),
        returnData,
      };
      additionalTypeDefs[idx] = `type ${type} { ${field}: ${fieldType} }`;

      return { additionalResolvers, additionalTypeDefs };
    },
    {
      additionalResolvers: [] as AdditionalResolver[],
      additionalTypeDefs: [] as string[],
    }
  );

  return { ...mesh, ...nextAdditionalResolvers };
};

export const createAdditionalResolversDefaultValues = (
  mesh?: ApiDef['mesh']
) => {
  const { additionalResolvers, additionalTypeDefs } = mesh || {};
  const hasResolvers = additionalResolvers && additionalTypeDefs;

  return hasResolvers
    ? {
        mesh: {
          ...mesh,
          additionalResolvers: additionalResolvers!.map(
            ({ args, ...resolver }, idx: number) => ({
              ...resolver,
              fieldType: additionalTypeDefs![idx].replace(
                /^.+:\s([\w]+!*)\s.+$/,
                '$1'
              ),
              args: objectToFieldArray(args),
            })
          ),
        },
      }
    : {};
};
