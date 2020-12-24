import React from 'react';
import { RemoveCircleOutline} from '@material-ui/icons';

import { WidgetBody, H4, Emoji } from '../../ui';
import { useStyles } from './useStyles';

export const EmptyGatewayNodes:React.FC = () => {
  const { emptyContainer, emptyIcon, emptyTitle, emptyImg } = useStyles();

  return (
    <WidgetBody>
      <div className={emptyContainer}>
        <div className={emptyIcon}>
          <RemoveCircleOutline className={emptyImg} />
        </div>
        <H4 className={emptyTitle}>
          You don't have any active Gateway Nodes at the moment <Emoji label="loudly crying face">😭</Emoji>
        </H4>
      </div>
    </WidgetBody>
  );
}
