import { EmptyContainer, EmptyText, Emoji, EmptyIcon } from '../../../../ui';
import { HealthCheckFailedAPI as Props } from '../../../../types';

export const HealthCheckFailedAPI: React.FC<Props> = ({ name }) => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        {name} API is not available at the moment. Try to refresh the page in a
        couple of seconds <Emoji label="dizzy face"> 😵</Emoji>{' '}
      </EmptyText>
    </EmptyContainer>
  );
};
