import React from 'react';
import { format } from 'date-fns';
import { Table, TableRow, TableHead } from '../../../ui';
import { useStyles } from './useStyles';
import { Log as ILog } from '../../../types';
import { LogLevelIcon } from '../LogLevelIcon/LogLevelIcon';
import { LogMessage } from '../LogMessage/LogMessage';
import { LogCell } from './LogCell';
import { AutoscrollCheckbox } from '../AutoscrollCheckbox';

const TABLE_HEAD = ['DATE', 'HOST', 'NODE ID', 'PREFIX', 'CONTENT'];

export const LogsTable: React.FC<{ logs: ILog[] }> = ({ logs }) => {
  const { table } = useStyles();

  return (
    <>
      <Table className={table}>
        <TableHead>
          {TABLE_HEAD.map((columnName) => (
            <LogCell>{columnName}</LogCell>
          ))}
        </TableHead>
        {logs.map(
          ({ nodeId, hostname, prefix, message, level, timestamp }, i) => (
            <TableRow key={i}>
              <LogCell>
                <LogLevelIcon level={level} />
                {format(+timestamp, 'LLL dd HH:mm:ss.SSS')}
              </LogCell>
              <LogCell>{hostname}</LogCell>
              <LogCell>{nodeId}</LogCell>
              <LogCell>{prefix}</LogCell>
              <LogCell>
                <LogMessage message={message} />
              </LogCell>
            </TableRow>
          )
        )}
      </Table>
      <AutoscrollCheckbox lastIndex={logs.length} />
    </>
  );
};
