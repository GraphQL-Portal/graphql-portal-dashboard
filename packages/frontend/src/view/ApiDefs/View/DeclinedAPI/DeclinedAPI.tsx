import { EmptyContainer, EmptyText, Emoji, EmptyIcon } from '../../../../ui';
import { DeclinedAPI as Props } from '../../../../types';

export const DeclinedAPI: React.FC<Props> = ({ name }) => {
  return (
    <EmptyContainer>
      <EmptyIcon />
      <EmptyText>
        API {name} is declined <Emoji label="dizzy face"> 😵</Emoji>.<br />
        Check you API and data source configs.
      </EmptyText>
    </EmptyContainer>
  );
};
