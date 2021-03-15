import { AdditionalResolver, AdditionalResolverForm } from '../../../types';

export const createMeshPayload = ({ mesh }: AdditionalResolverForm) => {
  if (!mesh?.additionalResolvers) {
    return { additionalResolvers: [], additionalTypeDefs: [] };
  }

  return mesh.additionalResolvers?.reduce(
    (
      { additionalResolvers, additionalTypeDefs },
      {
        field,
        fieldType,
        type,
        targetMethod,
        targetSource,
        requiredSelectionSet,
      },
      idx: number
    ) => {
      additionalResolvers[idx] = {
        type,
        field,
        targetMethod,
        targetSource,
        requiredSelectionSet,
      };
      additionalTypeDefs[idx] = `type ${type} { ${field}: ${fieldType} }`;

      return { additionalResolvers, additionalTypeDefs };
    },
    {
      additionalResolvers: [] as AdditionalResolver[],
      additionalTypeDefs: [] as string[],
    }
  );
};

export const createMeshDefaultValues = (
  mesh?: AdditionalResolverForm['mesh']
) => {
  const { additionalResolvers, additionalTypeDefs } = mesh || {};
  const hasResolvers = additionalResolvers && additionalTypeDefs;

  return hasResolvers
    ? {
        mesh: {
          additionalResolvers: additionalResolvers!.map(
            (resolver, idx: number) => ({
              ...resolver,
              fieldType: additionalTypeDefs![idx].replace(
                /^.+:\s([\w]+!*)\s.+$/,
                '$1'
              ),
            })
          ),
        },
      }
    : {};
};
