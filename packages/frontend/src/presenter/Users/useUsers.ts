import { useUsersQuery } from '../../model/Users/queries';
import { createUsersList } from './helpers';

export const useUsers = () => {
  const { data, loading, onBlock, onUnblock, onDelete, onEdit } = useUsersQuery();

  return {
    list: createUsersList(data),
    data,
    loading,
    onEdit: (index: number) => onEdit(data[index]),
    onBlock: (index: number) => onBlock(data[index]?._id),
    onUnblock: (index: number) => onUnblock(data[index]?._id),
    onDelete: (index: number) => onDelete(data[index]?._id, data[index]?.email)
  };
}
