export type UsersListFC = {
  list: string[][];
  data: any[];
  onDelete: (index: number) => any;
  onBlock: (index: number) => any;
  onUnblock: (index: number) => any;
  onEdit: (index: number) => any;
}