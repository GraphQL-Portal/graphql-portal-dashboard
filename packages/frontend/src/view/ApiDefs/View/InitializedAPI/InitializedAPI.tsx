import { EmptyContainer, EmptyText, Emoji } from '../../../../ui';
import { Loading } from '../../../Loading';
import { useStyles } from './useStyles';
import { InitializedAPI as Props } from '../../../../types';

export const InitializedAPI: React.FC<Props> = ({ name }) => {
  const { wrapper } = useStyles();
  return (
    <EmptyContainer>
      <div className={wrapper}>
        <EmptyText>
          API {name} is creating...<Emoji label="sleeping face"> 😴</Emoji>
        </EmptyText>
        <Loading />
      </div>
    </EmptyContainer>
  );
};
