import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import {
  WidgetBody,
  WidgetHeader,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '../../ui';
import { getKeyFromText } from '../../utils/getKeyFromText';
import { TABLE_HEAD } from './constants';
import { ApiActivityList as Props } from '../../types';
import { alignFirstCellLeft } from '../../utils';
import { useStyles } from './useStyles';

export const ApiActivityList: React.FC<Props> = ({ data, onApiClick }) => {
  const { tableRow } = useStyles();
  return (
    <>
      <WidgetHeader title="Traffic Activity per API" />
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
            {data.map(
              ({ apiName, apiDef, success, failed, count, lastAccess }) => (
                <TableRow
                  onClick={onApiClick(apiDef!)}
                  key={`apiActivity-${apiDef}`}
                  className={tableRow}
                >
                  <TableCell>{apiName}</TableCell>
                  <TableCell align="right">{count}</TableCell>
                  <TableCell align="right">{success}</TableCell>
                  <TableCell align="right">{failed}</TableCell>
                  <TableCell align="right">
                    {formatDistanceToNow(Number(lastAccess))} ago
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
};
