import React from 'react';
import { Delete, Edit } from '@material-ui/icons';
import {
  WidgetBody,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton
} from '../../ui';
import { getKeyFromText } from '../../utils/getKeyFromText';
import { TABLE_HEAD } from './constants';
import { useStyles } from './useStyles';
import { ApiDefsListFC } from './types';

const getCellAlign = (idx: number) => idx === 0 ? 'left' : 'right';

export const ApiDefsList:React.FC<ApiDefsListFC> = ({ list, onDelete, onUpdate }) => {
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
                  <IconButton>
                    <Edit onClick={onUpdate.bind(this, idx)} />
                  </IconButton>
                  <IconButton>
                    <Delete onClick={onDelete.bind(this, idx)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
}
