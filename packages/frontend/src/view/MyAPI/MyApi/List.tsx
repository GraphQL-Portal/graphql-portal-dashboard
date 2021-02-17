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
  Tooltip,
} from '../../../ui';
import { ApiList as Props } from '../../../types';
import { TABLE_HEAD } from './constants';
import { alignFirstCellLeft, getKeyFromText } from '../../../utils';

export const ApiDefsList: React.FC<Props> = ({ list, onDelete, onUpdate }) => {
  return (
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
          {list.map((api, idx) => (
            <TableRow key={`node-${idx}`}>
              <TableCell>{api.name}</TableCell>
              <TableCell align="right">{api.status}</TableCell>
              <TableCell align="right">{api.createdAt}</TableCell>
              <TableActionCell>
                <Tooltip title="Edit API" placement="left">
                  <IconButton onClick={onUpdate(idx)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete API" placement="left">
                  <IconButton onClick={onDelete(idx)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableActionCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </WidgetBody>
  );
};
