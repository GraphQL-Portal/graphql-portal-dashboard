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
        args,
      },
      idx: number
    ) => {
      // marshalling additional resolver arguments
      if (args && Array.isArray(args)) {
        args = args
          .map((v) => ({ [v.name]: v.value }))
          .reduce((a, b) => ({ ...a, ...b }));
      }

      additionalResolvers[idx] = {
        type,
        field,
        targetMethod,
        targetSource,
        requiredSelectionSet,
        args,
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
          additionalResolvers: additionalResolvers!
            .map((resolver, idx: number) => ({
              ...resolver,
              fieldType: additionalTypeDefs![idx].replace(
                /^.+:\s([\w]+!*)\s.+$/,
                '$1'
              ),
            }))
            // marshalling additional resolver args
            .map((resolver) => {
              if (
                resolver.args !== undefined &&
                typeof resolver.args === 'object'
              ) {
                resolver.args = Object.entries(resolver.args).map((entry) => ({
                  name: entry[0],
                  value: entry[1],
                }));
              }
              return resolver;
            }),
        },
      }
    : {};
};
