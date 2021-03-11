import React from 'react';

import { Add } from '../../../icons';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableActionCell,
  Tooltip,
  IconButton,
  TableIcon,
  TableIconCell,
  H5,
} from '../../../ui';
import { getKeyFromText, objectKeys } from '../../../utils';
import { AvailableTransforms as Props } from '../../../types';
import { AVAILABLE_TRANSFORMS_HEAD } from '../constants';
import { TYPE_MAPPER } from './constantst';
import { useStyles } from './useStyles';

export const AvailableTransforms: React.FC<Props> = ({ transforms, onAdd }) => {
  const { availableTitle } = useStyles();
  return (
    <>
      <H5 className={availableTitle}>Available Transforms</H5>
      <Table>
        <TableHead>
          {AVAILABLE_TRANSFORMS_HEAD.map((title: string, idx: number) => (
            <TableCell
              key={getKeyFromText(title)}
              align={
                idx === AVAILABLE_TRANSFORMS_HEAD.length - 1 ? 'right' : 'left'
              }
            >
              {title}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {objectKeys(transforms).map((key: string) => {
            const { description } = transforms[key];
            const TypeIcon = TYPE_MAPPER[key];
            return (
              <TableRow key={`transform-${key}`}>
                <TableCell>{key}</TableCell>
                <TableIconCell>
                  <TableIcon>{TypeIcon && <TypeIcon />}</TableIcon>
                  Free
                </TableIconCell>
                <TableCell>{description}</TableCell>
                <TableActionCell>
                  <Tooltip
                    title="Add transform"
                    placement="left"
                    aria-label="delete transform"
                  >
                    <IconButton onClick={onAdd(key)}>
                      <Add />
                    </IconButton>
                  </Tooltip>
                </TableActionCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
