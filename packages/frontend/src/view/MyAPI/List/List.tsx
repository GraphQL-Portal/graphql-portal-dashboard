import React from 'react';

import { Delete, Edit } from '../../../icons';
import {
  WidgetBody,
  Table,
  TableHead,
  TableCell,
  TableActionCell,
  TableBody,
  TableRow,
  IconButton,
} from '../../../ui';
import { alignFirstCellLeft, getKeyFromText } from '../../../utils';
import { TABLE_HEAD } from './constants';
import { ApiDefsListFC } from './types';

export const ApiDefsList: React.FC<ApiDefsListFC> = ({
  list,
  onDelete,
  onUpdate,
}) => {
  return (
    <>
      <WidgetBody>
        <Table>
          <TableHead>
            {TABLE_HEAD.map((cell, idx) => (
              <TableCell
                key={getKeyFromText(cell)}
                align={alignFirstCellLeft(idx)}
              >
                {cell}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {list.map((node, idx) => (
              <TableRow key={`node-${idx}`}>
                {node.map((item: any, indx: any) => (
                  <TableCell
                    key={`node-${idx}-item-${indx}`}
                    align={alignFirstCellLeft(indx)}
                  >
                    {item}
                  </TableCell>
                ))}
                <TableActionCell>
                  <IconButton>
                    <Edit onClick={onUpdate(idx)} />
                  </IconButton>
                  <IconButton>
                    <Delete onClick={onDelete(idx)} />
                  </IconButton>
                </TableActionCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
};
