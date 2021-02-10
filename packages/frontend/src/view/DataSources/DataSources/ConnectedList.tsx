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
  TableActionCell,
  IconButton,
  Tooltip,
} from '../../../ui';
import { getKeyFromText } from '../../../utils';
import { CONNECTED_HEAD } from '../constants';
import { ConnectedList as Props } from './types';
import { formatDateDistance, formatHandlerType } from '../helpers';

export const ConnectedList: React.FC<Props> = ({
  sources,
  onDelete,
  onUpdate,
}) => {
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
              const { name, updatedAt, _id, handler } = source;
              console.log(handler);
              return (
                <TableRow key={getKeyFromText(name)}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{formatHandlerType(handler)}</TableCell>
                  <TableCell>{formatDateDistance(updatedAt)}</TableCell>
                  <TableActionCell>
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
                  </TableActionCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
};
