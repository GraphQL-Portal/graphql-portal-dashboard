export type GroupItem = {
  text: string;
  link: string;
}

export type Group = {
  name?: string;
  items: GroupItem[];
};
