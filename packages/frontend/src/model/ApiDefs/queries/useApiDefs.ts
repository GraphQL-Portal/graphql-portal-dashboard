import { useQuery, gql } from '@apollo/client';

export const QUERY_API_DEFS = gql`
  {
    getApiDefs {
      apiDefs {
        _id
        name
        createdAt
        updatedAt
      }
      timestamp
    }
  }
`;


type ApiDef = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const createNodeList = (data: ApiDef[]) => {
  if (!data) return [];

  return data.reduce((acc: any[], apiDef: ApiDef) => {
    acc.push([apiDef.name, 'active', new Date(parseInt(apiDef.createdAt)).toLocaleDateString()]);
    return acc;
  }, []);
};

export const useApiDefs = () => {
  const { data, loading, error } = useQuery(QUERY_API_DEFS);

  return {
    data: data?.getApiDefs?.apiDefs || [],
    loading,
    error,
  };
}
