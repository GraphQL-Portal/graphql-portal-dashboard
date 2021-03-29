import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../../ui';
import { scrollTo } from '../../../utils';

export const AutoscrollCheckbox: React.FC<{ lastIndex: number }> = ({
  lastIndex,
}) => {
  const [autoscroll, setAutoscroll] = useState(false);

  useEffect(() => {
    if (autoscroll) scrollTo();
  }, [lastIndex, autoscroll]);

  return (
    <>
      <Checkbox
        value={autoscroll}
        onChange={((checked: boolean) => setAutoscroll(checked)) as any}
      />
      Autoscroll with output
    </>
  );
};
