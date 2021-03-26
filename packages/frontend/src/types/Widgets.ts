import { ClassName } from './React';
import { JustifyContent } from './Styles';

export type WidgetHeader = {
  title: string;
  tooltip?: string;
};

export type WidgetActions = {
  justify?: JustifyContent;
};

export type Widget = ClassName;
