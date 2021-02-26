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
import { getKeyFromText, alignFirstCellLeft } from '../../utils';
import { TABLE_HEAD } from './constants';
import { GatewayNodesList as Props } from '../../types/Gateway';

export const GatewayNodesList: React.FC<Props> = ({ list }) => {
  return (
    <>
      <WidgetHeader title="List of Active Nodes" />
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
            {list.map(
              ({ nodeId, lastPingAt, hostname, status, configTimestamp }) => (
                <TableRow key={nodeId}>
                  <TableCell>{nodeId}</TableCell>
                  <TableCell align="right">{hostname}</TableCell>
                  <TableCell align="right">{status}</TableCell>
                  <TableCell align="right">{lastPingAt}</TableCell>
                  <TableCell align="right">{configTimestamp}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
};
