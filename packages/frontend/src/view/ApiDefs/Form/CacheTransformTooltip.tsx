import React from 'react';
import { TooltipTitle, TooltipUL, TooltipListItem } from '../../../ui';

const ITEMS = [
  '{args.argName} - use resolver argument',
  '{typeName} - use name of the type',
  '{fieldName} - use name of the field',
  "{argsHash} - a hash based on the 'args' object",
  '{fieldNamesHash} - a hash based on the field names selected by the client',
  '{info} - the GraphQLResolveInfo of the resolver',
];

export const CacheTransformTooltip: React.FC = () => {
  return (
    <>
      <TooltipTitle>Available variables:</TooltipTitle>
      <TooltipUL>
        {ITEMS.map((item, idx) => (
          <TooltipListItem key={`tooltip-list-item-${idx}`}>
            {item}
          </TooltipListItem>
        ))}
      </TooltipUL>
    </>
  );
};
