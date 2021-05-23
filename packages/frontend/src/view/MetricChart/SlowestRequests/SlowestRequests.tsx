import { format } from 'date-fns';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { getKeyFromText } from '../../../utils';
import { SlowestRequestMetric } from '../../../types';
import { Tooltip } from '../../../ui';
import { PrettyQueryJSON } from './PrettyQueryJSON';
import { TABLE_HEAD, MAX_LATENCY_WIDTH } from './contants';
import { useStyles } from './useStyles';

export const SlowestRequests: React.FC<{ data: SlowestRequestMetric[] }> = ({
  data = [],
}) => {
  const { latencyLine } = useStyles();
  const maxLatencyValue = Math.max(
    ...data.map(({ latency }: { latency: number }) => latency)
  );
  const getLatencyWidth = (latency: number) =>
    (latency * MAX_LATENCY_WIDTH) / maxLatencyValue;
  return (
    <Table>
      <TableHead>
        {TABLE_HEAD.map((cell, idx) => (
          <TableCell key={getKeyFromText(cell)}>{cell}</TableCell>
        ))}
      </TableHead>
      <TableBody>
        {data.map(
          ({ requestDate, latency, apiName, resolver, query }, i: number) => {
            return (
              <TableRow key={i}>
                <TableCell>{format(+requestDate, 'LLL dd HH:mm:ss')}</TableCell>
                <TableCell>
                  <div>
                    <span> {latency} ms </span>
                    <div
                      style={{
                        maxWidth: MAX_LATENCY_WIDTH,
                        width: `${getLatencyWidth(latency)}px`,
                      }}
                      className={latencyLine}
                    >
                      {latency}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{apiName}</TableCell>
                <TableCell>{resolver.source}</TableCell>
                <TableCell>
                  <Tooltip
                    title={<PrettyQueryJSON query={query} />}
                    placement="left"
                  >
                    <span> {resolver.path} </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {resolver.error?.extensions?.statusText ||
                    resolver.error ||
                    'SUCCESS'}
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};
