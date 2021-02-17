import { useState } from 'react';
import { UseTabsHook, TabOnChange } from '../../types';

export const useTabs: UseTabsHook = (value = 0) => {
  const [tab, setTab] = useState<number>(value);

  const onChange: TabOnChange = (_, value) => setTab(value);

  return { tab, onChange };
};
