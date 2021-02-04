import React from 'react';
import { Delete, Edit } from '@material-ui/icons';

import {
  WidgetHeader,
  WidgetBody,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from '../../../ui';
import { getKeyFromText } from '../../../utils';
import { CONNECTED_HEAD } from '../constants';
import { useStyles } from './useStyles';
import { ConnectedList as Props } from './types';

export const ConnectedList: React.FC<Props> = ({
  sources,
  onDelete,
  onUpdate,
}) => {
  const { actionCell } = useStyles();
  return (
    <>
      <WidgetHeader title="My connected data-sources" />
      <WidgetBody>
        <Table>
          <TableHead>
            {CONNECTED_HEAD.map((cell: string, idx: number) => (
              <TableCell
                key={getKeyFromText(cell)}
                align={idx === CONNECTED_HEAD.length - 1 ? 'right' : 'left'}
              >
                {cell}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {sources.map((source) => {
              const { name, type, status, createdAt, _id } = source;
              return (
                <TableRow key={getKeyFromText(name)}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{type || ''}</TableCell>
                  <TableCell>{status || ''}</TableCell>
                  <TableCell>{createdAt || ''}</TableCell>
                  <TableCell align="right" className={actionCell}>
                    <Tooltip
                      title="Edit data-source"
                      placement="left"
                      aria-label="edit data-source"
                    >
                      <span>
                        <IconButton onClick={onUpdate(source)}>
                          <Edit />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip
                      title="Delete data-source"
                      placement="left"
                      aria-label="delete data-source"
                    >
                      <span>
                        <IconButton onClick={onDelete(_id, name)}>
                          <Delete />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
};
