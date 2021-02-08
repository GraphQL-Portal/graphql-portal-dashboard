import React, { useState } from 'react';

export const useTabs = (value: number = 0) => {
  const [tab, setTab] = useState<number>(value);

  const onChange = (event: React.ChangeEvent<{}>, value: any) => {
    setTab(value);
  };

  return { tab, onChange };
};
