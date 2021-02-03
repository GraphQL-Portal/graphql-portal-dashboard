import React from 'react';
import { LockOpen, Lock, Delete, Edit } from '@material-ui/icons';

import {
  WidgetBody,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Tooltip,
  IconButton,
} from '../../ui';
import { getKeyFromText } from '../../utils/getKeyFromText';
import { TABLE_HEAD } from './constants';
import { UsersList as Props } from '../../types';
import { useStyles } from './useStyles';

const getCellAlign = (idx: number) => (idx === 0 ? 'left' : 'right');

export const UsersList: React.FC<Props> = ({
  list,
  onUnblock,
  onBlock,
  onDelete,
  onEdit,
}) => {
  const { actionCell } = useStyles();
  return (
    <>
      <WidgetBody>
        <Table>
          <TableHead>
            {TABLE_HEAD.map((cell, idx) => (
              <TableCell key={getKeyFromText(cell)} align={getCellAlign(idx)}>
                {cell}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {list.map(
              (
                { email, firstName, lastName, createdAt, deletedAt, role },
                idx
              ) => (
                <TableRow key={`node-${idx}`}>
                  <TableCell align="left">{email}</TableCell>
                  <TableCell align="right">{role}</TableCell>
                  <TableCell align="right">{firstName}</TableCell>
                  <TableCell align="right">{lastName}</TableCell>
                  <TableCell align="right">{createdAt}</TableCell>
                  <TableCell align="right" className={actionCell}>
                    {!!deletedAt ? (
                      <Tooltip
                        title="Unblock user"
                        placement="left"
                        aria-label="unblock user"
                      >
                        <span>
                          <IconButton onClick={() => onUnblock(idx)}>
                            <Lock />
                          </IconButton>
                        </span>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Block user"
                        placement="left"
                        aria-label="block user"
                      >
                        <span>
                          <IconButton onClick={() => onBlock(idx)}>
                            <LockOpen />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                    <Tooltip
                      title="Edit user"
                      placement="left"
                      aria-label="edit user"
                    >
                      <span>
                        <IconButton onClick={() => onEdit(idx)}>
                          <Edit />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip
                      title="Delete user"
                      placement="left"
                      aria-label="delete user"
                    >
                      <span>
                        <IconButton onClick={() => onDelete(idx)}>
                          <Delete />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
};
