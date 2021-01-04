export type ApiDef = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiDefsListFC = {
  list: string[][];
  onDelete: (index: number) => any;
  onUpdate: (index: number) => any;
}