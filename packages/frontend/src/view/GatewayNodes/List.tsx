import React from 'react';
import {
  WidgetHeader,
  WidgetBody,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '../../ui';
import { getKeyFromText } from '../../utils/getKeyFromText';
import { TABLE_HEAD } from './constants';
import { GatewayNodesList as Props } from './types';

const getCellAlign = (idx: number) => (idx === 0 ? 'left' : 'right');

export const GatewayNodesList: React.FC<Props> = ({ list }) => {
  return (
    <>
      <WidgetHeader title="List of Active Nodes" />
      <WidgetBody>
        <Table>
          <TableHead>
            {TABLE_HEAD.map((cell, idx) => (
              <TableCell key={getKeyFromText(cell)} align={getCellAlign(idx)}>
                {cell}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {list.map((node, idx) => (
              <TableRow key={`node-${idx}`}>
                {node.map((item: any, indx: any) => (
                  <TableCell
                    key={`node-${idx}-item-${indx}`}
                    align={getCellAlign(indx)}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
};
