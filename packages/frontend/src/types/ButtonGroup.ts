export type ButtonGroupButton = {
  text: string;
  value: any;
};

export type ButtonGroupProps = {
  buttons: ButtonGroupButton[];
  onClick(value: ButtonGroupButton['value']): void;
  active: ButtonGroupButton['value'];
};
