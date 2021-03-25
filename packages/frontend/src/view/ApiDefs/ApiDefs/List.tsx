import React, { createElement } from 'react';
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
import { EnableSwitch } from '../Form';
import { TABLE_HEAD } from './constants';
import { useStyles } from './useStyles';

export const ApiDefsList: React.FC<Props> = ({
  list,
  refetch,
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
                {createElement(
                  api.enabled ? Link : 'spawn',
                  {
                    className: name,
                    to: api.enabled
                      ? generatePath(ROUTES.API_VIEW, { id: api._id })
                      : '',
                  },
                  api.name
                )}
              </TableCell>
              <TableCell align="right">
                <EnableSwitch api={api} refetch={refetch} />
              </TableCell>
              <TableCell align="right">{api.createdAt}</TableCell>
              <TableActionCell>
                <Tooltip title="View API" placement="left">
                  <IconButton onClick={onView(api)} disabled={!api.enabled}>
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
