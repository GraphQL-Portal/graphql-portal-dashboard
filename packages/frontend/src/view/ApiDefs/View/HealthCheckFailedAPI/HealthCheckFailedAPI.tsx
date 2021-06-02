import { EmptyContainer, EmptyText, Emoji, EmptyIcon } from '../../../../ui';
import { HealthCheckFailedAPI as Props } from '../../../../types';

export const HealthCheckFailedAPI: React.FC<Props> = ({ name }) => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        Health check failed for {name} API <Emoji label="dizzy face"> 😵</Emoji>{' '}
        <br></br>
      </EmptyText>
    </EmptyContainer>
  );
};
