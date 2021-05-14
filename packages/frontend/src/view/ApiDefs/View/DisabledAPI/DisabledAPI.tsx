import { EmptyContainer, EmptyText, Emoji, EmptyIcon } from '../../../../ui';
import { DeclinedAPI as Props } from '../../../../types';

export const DisabledAPI: React.FC<Props> = ({ name }) => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        API {name} is disabled <Emoji label="dizzy face"> 😵</Emoji>
      </EmptyText>
    </EmptyContainer>
  );
};
