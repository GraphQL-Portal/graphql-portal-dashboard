export type ApiDef = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiListItem = ApiDef & { status: string };

export type ApiList = {
  list: ApiListItem[];
  onDelete: (index: number) => any;
  onUpdate: (index: number) => any;
};
