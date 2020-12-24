export type WidgetHeader = {
  title: string;
  tooltip?: string;
}

export type WidgetActions = {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
};

export type Widget = {
  className?: string;
};
