import React from 'react';
import {
  TooltipText,
  TooltipTitle,
  TooltipUL,
  TooltipListItem,
} from '../../../ui';

const ITEMS = [
  '{args.argName} - use resolver argument',
  '{typeName} - use name of the type',
  '{fieldName} - use name of the field',
  "{argsHash} - a hash based on the 'args' object",
  '{fieldNamesHash} - a hash based on the field names selected by the client',
  '{info} - the GraphQLResolveInfo of the resolver',
];
const EXAMPLE = 'Default is {typeName}-{fieldName}-{argsHash}-{fieldNamesHash}';

export const CacheTransformTooltip: React.FC = () => {
  return (
    <>
      <TooltipText>Cache key used to store the responses</TooltipText>
      <TooltipText>{EXAMPLE}</TooltipText>
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
