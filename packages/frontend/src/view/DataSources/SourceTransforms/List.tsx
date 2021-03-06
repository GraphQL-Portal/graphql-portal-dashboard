import React from 'react';

import { Delete, Edit } from '../../../icons';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableActionCell,
  Tooltip,
  IconButton,
} from '../../../ui';
import { getKeyFromText } from '../../../utils';
import { TransformsList as Props } from '../../../types';
import { TRANSFORMS_HEAD } from '../constants';
import { useStyles } from './useStyles';
import { createTransformList } from '../../../presenter/DataSources/helpers';

export const List: React.FC<Props> = ({ transforms, onRemove, onEdit }) => {
  const { list } = useStyles();
  if (transforms.length === 0) return null;
  const transformsList = createTransformList(transforms);

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
        {transformsList.map((transform, idx) => (
          <TableRow key={getKeyFromText(transform.name)}>
            <TableCell>{transform.title}</TableCell>
            <TableCell>{transform.description}</TableCell>
            <TableCell />
            <TableActionCell>
              <Tooltip
                title="Edit transform"
                placement="left"
                aria-label="delete transform"
              >
                <IconButton onClick={onEdit(idx, transform)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Delete transform"
                placement="left"
                aria-label="delete transform"
              >
                <IconButton onClick={onRemove(idx)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </TableActionCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
