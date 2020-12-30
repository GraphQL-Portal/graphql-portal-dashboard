
import React from 'react';
import { Delete, Edit } from '@material-ui/icons';
import {
  WidgetBody,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '../../ui';
import { getKeyFromText } from '../../utils/getKeyFromText';
import { TABLE_HEAD } from './constants';
import { createNodeList } from '../../model/ApiDefs/queries';

const getCellAlign = (idx: number) => idx === 0 ? 'left' : 'right';

type ApiDefsListFC = {
  [key: string]: any
}

export const ApiDefsList:React.FC<ApiDefsListFC> = ({ list, onDelete, onUpdate }) => {
  return (
    <>
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
            {createNodeList(list).map((node, idx) => (
              <TableRow key={`node-${idx}`}>
                {node.map((item: any, indx: any) => (
                  <TableCell key={`node-${idx}-item-${indx}`} align={getCellAlign(indx)}>
                    {item}
                  </TableCell>
                ))}
                <TableCell key={`node-${idx}-item-${node.map.length}`} align={getCellAlign(node.map.length)}>
                  <Edit onClick={() => onUpdate(list[idx]._id)}/>
                  <Delete onClick={() => onDelete(list[idx]._id)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WidgetBody>
    </>
  );
}
