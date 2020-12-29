import React from 'react';

import { Table, TableHead, TableCell, TableBody, TableRow } from '../../ui';
import { getKeyFromText } from '../../utils/getKeyFromText';

import { AvailableList as Props } from './types';
import { AVAILABLE_HEAD } from './constants';

const getCellAlign = (idx: number, length: number) => idx + 1 === length ? 'right' : 'left';

export const AvailableList:React.FC<Props> = ({ list }) => {
  const { length } = AVAILABLE_HEAD;

  return (
    <Table>
      <TableHead>
        {AVAILABLE_HEAD.map((cell, idx) => (
          <TableCell key={getKeyFromText(cell)} align={getCellAlign(idx, length)}>
            {cell}
          </TableCell>
        ))}
      </TableHead>
      <TableBody>
        {list.map((node, idx) => (
          <TableRow key={`node-${idx}`}>
            <TableCell>
              {node.title}
            </TableCell>
            <TableCell>
              {node.type}
            </TableCell>
            <TableCell />
            <TableCell align="right"/>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
