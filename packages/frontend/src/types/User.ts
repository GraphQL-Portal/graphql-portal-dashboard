export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type UsersList = {
  list: User[];
  onDelete: (index: number) => any;
  onBlock: (index: number) => any;
  onUnblock: (index: number) => any;
  onEdit: (index: number) => any;
};

export type Role = 'admin' | 'user' | '';
