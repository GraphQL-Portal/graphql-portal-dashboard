import React from 'react';
import { Controller } from 'react-hook-form';
import { Search, Close, Add } from '@material-ui/icons';

import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Input,
  IconButton,
  Tooltip,
} from '../../../ui';
import { getKeyFromText } from '../../../utils/getKeyFromText';
import { useAvailableSources } from '../../../presenter/DataSources';
import { AVAILABLE_HEAD } from '../constants';
import { useStyles } from './useStyles';

const getCellAlign = (idx: number, length: number) =>
  idx + 1 === length ? 'right' : 'left';

export const AvailableList: React.FC = () => {
  const { length } = AVAILABLE_HEAD;
  const {
    available,
    control,
    onReset,
    onSubmit,
    showClearButton,
    onKeyDown,
    onAddClick,
  } = useAvailableSources();

  const { form, searchIcon, actionCell } = useStyles();

  return (
    <>
      <form noValidate autoComplete="off" className={form} onSubmit={onSubmit}>
        <Controller
          as={Input}
          control={control}
          fullWidth
          placeholder="Search data connectors"
          name="search"
          onKeyDown={onKeyDown}
          InputProps={{
            startAdornment: <Search className={searchIcon} />,
            endAdornment: showClearButton ? (
              <IconButton onClick={onReset}>
                <Close />
              </IconButton>
            ) : null,
            autoComplete: 'off',
          }}
        />
      </form>
      <Table>
        <TableHead>
          {AVAILABLE_HEAD.map((cell, idx) => (
            <TableCell
              key={getKeyFromText(cell)}
              align={getCellAlign(idx, length)}
            >
              {cell}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {Object.keys(available).map((key: string) => {
            const source = available[key];
            const { title, type, description } = source;
            return (
              <TableRow key={key}>
                <TableCell>{title}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell align="right" className={actionCell}>
                  <Tooltip
                    title="Add connector"
                    placement="left"
                    aria-label="add connector"
                  >
                    <span>
                      <IconButton onClick={onAddClick(source, key)}>
                        <Add />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
