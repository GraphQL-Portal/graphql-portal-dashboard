import { TabsProps } from '@material-ui/core';

export type TabListItem = {
  label: string;
  disabled?: boolean;
};

export type TabOnChange = (event: React.ChangeEvent<{}>, value: any) => void;

export type UseTabsHook = (
  value?: number
) => {
  tab: number;
  onChange: TabOnChange;
};

export type TabsHead = {
  tabsList: TabListItem[];
  onChange: TabOnChange;
} & Omit<TabsProps, 'onChange'>;

export type TabsBody = {
  value: number;
};
