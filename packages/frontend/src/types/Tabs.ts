import { TabsProps } from '@material-ui/core';

export type TabListItem = {
  label: string;
  disabled?: boolean;
};

export type TabsHead = {
  tabsList: TabListItem[];
  onChange(event: React.ChangeEvent<{}>, value: any): void;
} & Omit<TabsProps, 'onChange'>;

export type TabsBody = {
  value: number;
};
