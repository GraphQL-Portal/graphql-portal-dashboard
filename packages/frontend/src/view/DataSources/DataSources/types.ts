type DataSource = {
  _id: string;
  name: string;
  type?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  handler: any;
  transforms: any;
};

export type ConnectedList = {
  sources: DataSource[];
  onDelete(id: string, name: string): () => any;
  onUpdate(source: any): () => void;
};
