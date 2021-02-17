import React from 'react';
import { generatePath, Link } from 'react-router-dom';

import { Delete, Edit, Visibility } from '../../../icons';
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
import { alignFirstCellLeft, getKeyFromText } from '../../../utils';
import { ROUTES } from '../../../model/providers';
import { TABLE_HEAD } from './constants';
import { useStyles } from './useStyles';

export const ApiDefsList: React.FC<Props> = ({
  list,
  onDelete,
  onUpdate,
  onView,
}) => {
  const { name } = useStyles();
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
              <TableCell>
                <Link
                  to={generatePath(ROUTES.API_VIEW, { id: api._id })}
                  className={name}
                >
                  {api.name}
                </Link>
              </TableCell>
              <TableCell align="right">
                {api.enabled ? 'active' : 'inactive'}
              </TableCell>
              <TableCell align="right">{api.createdAt}</TableCell>
              <TableActionCell>
                <Tooltip title="View API" placement="left">
                  <IconButton onClick={onView(api)}>
                    <Visibility />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit API" placement="left">
                  <IconButton onClick={onUpdate(api)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete API" placement="left">
                  <IconButton onClick={onDelete(api)}>
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
