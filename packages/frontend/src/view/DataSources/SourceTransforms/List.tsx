import React from 'react';
import { Delete } from '@material-ui/icons';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
} from '../../../ui';
import { getKeyFromText } from '../../../utils';
import { TransformsList as Props } from '../../../types';
import { TRANSFORMS_HEAD } from '../constants';
import { useStyles } from './useStyles';

export const List: React.FC<Props> = ({ transforms, onRemove }) => {
  const { list, actionCell } = useStyles();
  if (transforms.length === 0) return null;
  return (
    <Table className={list}>
      <TableHead>
        {TRANSFORMS_HEAD.map((title: string, idx: number) => (
          <TableCell
            key={getKeyFromText(title)}
            align={idx === TRANSFORMS_HEAD.length - 1 ? 'right' : 'left'}
          >
            {title}
          </TableCell>
        ))}
      </TableHead>
      <TableBody>
        {transforms.map((transform, idx) => (
          <TableRow key={transform.name}>
            <TableCell>{transform.name}</TableCell>
            <TableCell>{transform.description}</TableCell>
            <TableCell />
            <TableCell align="right" className={actionCell}>
              <Tooltip
                title="Delete transform"
                placement="left"
                aria-label="delete transform"
              >
                <span>
                  <IconButton onClick={onRemove(idx)}>
                    <Delete />
                  </IconButton>
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
