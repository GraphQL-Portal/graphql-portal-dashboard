import React from 'react';

import { Table, TableHead, TableBody, TableRow, TableCell } from '../../../ui';
import { getKeyFromText } from '../../../utils';
import { TRANSFORMS_HEAD } from '../constants';
import { useStyles } from './useStyles';

type Props = {
  transforms: any[];
};

export const List: React.FC<Props> = ({ transforms }) => {
  const { list } = useStyles();
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
        {transforms.map((transform) => (
          <TableRow key={transform.name}>
            <TableCell>{transform.name}</TableCell>
            <TableCell>{transform.description}</TableCell>
            <TableCell />
            <TableCell align="right" />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
