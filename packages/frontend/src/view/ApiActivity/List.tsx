import React from 'react';
import moment from 'moment';

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

const getCellAlign = (idx: number) => (idx === 0 ? 'left' : 'right');

export const ApiActivityList: React.FC<{ data: any[], onApiClick: (apiDef: string) => void }> = ({ data, onApiClick }) => {
  return (
    <>
      <WidgetHeader title="Traffic Activity per API" />
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
            {data.map(
              (
                { apiName, apiDef, success, failed, count, lastAccess },
                idx
              ) => (
                <>
                  <TableRow onClick={() => onApiClick(apiDef)} key={`node-${idx}`}>
                    <TableCell align="left">{apiName}</TableCell>
                    <TableCell align="right">{count}</TableCell>
                    <TableCell align="right">{success}</TableCell>
                    <TableCell align="right">{failed}</TableCell>
                    <TableCell align="right">{moment(Number(lastAccess)).fromNow()}</TableCell>
                  </TableRow>
                </>
              )
            )}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
};
