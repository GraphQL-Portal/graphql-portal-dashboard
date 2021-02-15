import React from 'react';

import { Delete, Edit } from '../../../icons';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableActionCell,
  TableIconCell,
  TableIcon,
  IconButton,
  Tooltip,
} from '../../../ui';
import { getKeyFromText } from '../../../utils';
import { ConnectedList as Props } from '../../../types';
import { CONNECTED_HEAD } from '../constants';
import { formatDateDistance, formatHandlerType } from '../helpers';
import { handlerMapper } from './helpers';

export const ConnectedList: React.FC<Props> = ({
  sources,
  onDelete,
  onUpdate,
}) => {
  return (
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
        {sources.map((source, idx: number) => {
          const { name, updatedAt, handler } = source;
          const fHandler = formatHandlerType(handler);
          const HandlerIcon = handlerMapper(fHandler);
          return (
            <TableRow key={getKeyFromText(name)}>
              <TableCell>{name}</TableCell>
              <TableIconCell>
                <TableIcon>{HandlerIcon && <HandlerIcon />}</TableIcon>
                {fHandler}
              </TableIconCell>
              <TableCell>{formatDateDistance(updatedAt)}</TableCell>
              <TableActionCell>
                {typeof onUpdate === 'function' && (
                  <Tooltip
                    title="Edit data-source"
                    placement="left"
                    aria-label="edit data-source"
                  >
                    <span>
                      <IconButton onClick={onUpdate(idx)}>
                        <Edit />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                <Tooltip
                  title="Delete data-source"
                  placement="left"
                  aria-label="delete data-source"
                >
                  <span>
                    <IconButton onClick={onDelete(idx)}>
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
  );
};
