import React from 'react';
import { Helmet } from 'react-helmet';

import {
  Header,
  HugeWidget,
  PrimaryButton,
  WidgetRow,
  WidgetHeader,
  WidgetBody,
  TableHead,
  Table,
  TableBody, TableRow, TableCell } from '../../ui';
import { useGatewayNodes } from '../../presenter/GatewayNodes';
import { getKeyFromText } from '../../utils/getKeyFromText';

import { TABLE_HEAD } from './constants';
import { useStyles } from './useStyles';

export const GatewayNodes:React.FC = () => {
  const { data, onSyncClick, timestamp } = useGatewayNodes();
  const { config } = useStyles();

  return (
    <>
      <Helmet>
        <title>Gateway Nodes</title>
      </Helmet>
      <Header title="Active Gateway Nodes">
        {timestamp !== 0 && (
          <p className={config}>
            <span>Config version:</span> {timestamp}
          </p>
        )}
        <PrimaryButton onClick={onSyncClick}>Sync configuration</PrimaryButton>
      </Header>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="List of Active Nodes" />
          <WidgetBody>
            <Table>
              <TableHead>
                {TABLE_HEAD.map((cell, idx) => (
                  <TableCell key={getKeyFromText(cell)} align={idx === 0 ? 'left' : 'right'}>
                    {cell}
                  </TableCell>
                ))}
              </TableHead>
              <TableBody>
                {data.map((node, idx) => (
                  <TableRow key={`node-${idx}`}>
                    {node.map((item: any, indx: any) => (
                      <TableCell key={`node-${idx}-item-${indx}`} align={indx === 0 ? 'left' : 'right'}>
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
}
