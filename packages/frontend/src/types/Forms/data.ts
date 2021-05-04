export type SelectOption = {
  label: string;
  value: string;
};

export type StringArrayItem = { value: string };

export type StringArray = StringArrayItem[];

export type ObjectArrayItem = { key: string; value: string };

export type ObjectArray = ObjectArrayItem[];

export type ObjectArrayWithSelectItem = ObjectArrayItem & {
  options: SelectOption[];
};

export type ObjectArrayWithSelect = ObjectArrayWithSelectItem[];
