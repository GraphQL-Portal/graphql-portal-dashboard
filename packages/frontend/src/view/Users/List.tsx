
import { Block } from '@material-ui/icons';
import React from 'react';
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
import { UsersListFC } from './types';
import { useStyles } from './useStyles';

const getCellAlign = (idx: number) => idx === 0 ? 'left' : 'right';

export const UsersList: React.FC<UsersListFC> = ({ list }) => {
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
            {list.map((node, idx) => (
              <TableRow key={`node-${idx}`}>
                {node.map((item: any, indx: any) => (
                  <TableCell key={`node-${idx}-item-${indx}`} align={getCellAlign(indx)}>
                    {item}
                  </TableCell>
                ))}
                <TableCell align="right" className={actionCell}>
                  <Tooltip title="Block user" placement="left" aria-label="block user">
                    <span>
                      <IconButton>
                        <Block/>
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
}
