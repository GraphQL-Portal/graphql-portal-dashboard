export type ApiDef = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiDefsListFC = {
  list: ApiDef[];
  onDelete: (id: string) => Promise<any>;
  onUpdate: (id: string) => Promise<any>;
}