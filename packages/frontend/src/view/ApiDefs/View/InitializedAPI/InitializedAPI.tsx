import { EmptyContainer, EmptyText, Emoji } from '../../../../ui';
import { Loading } from '../../../Loading';
import { useStyles } from './useStyles';
import { InitializedAPI as Props } from '../../../../types';
import { useEffect, useState } from 'react';

export const InitializedAPI: React.FC<Props> = ({ name, refetch }) => {
  const { wrapper } = useStyles();
  const [calls, setCalls] = useState(0);
  const interval = 3000;

  useEffect(() => {
    setTimeout(() => {
      if (refetch) refetch();
      setCalls(calls + 1);
    }, interval);
  }, [refetch, calls]);

  return (
    <EmptyContainer>
      <div className={wrapper}>
        <EmptyText>
          API {name} is initializing...<Emoji label="sleeping face"> 😴</Emoji>
        </EmptyText>
        <Loading />
      </div>
    </EmptyContainer>
  );
};
