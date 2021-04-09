import React from 'react';
import { Controller } from 'react-hook-form';

import { Search, Close, Add } from '../../../icons';
import {
  Table,
  TableHead,
  TableCell,
  TableActionCell,
  TableBody,
  TableRow,
  TableIcon,
  TableIconCell,
  Input,
  IconButton,
  Tooltip,
} from '../../../ui';
import { getKeyFromText } from '../../../utils';
import { useAvailableSources } from '../../../presenter/DataSources';
import { AVAILABLE_HEAD } from '../constants';
import { useStyles } from './useStyles';
import { formatHandlerTitle } from '../helpers';
import { handlerMapper, typeMapper } from './helpers';
import { selectors } from '../../Tour';

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

  const { form, searchIcon } = useStyles();

  return (
    <div data-intro={selectors.DATA_SOURCE_AVAILABLE}>
      <form noValidate autoComplete="off" className={form} onSubmit={onSubmit}>
        <Controller
          as={Input}
          control={control}
          fullWidth
          placeholder="Search data connectors"
          name="search"
          onKeyDown={onKeyDown}
          data-intro={selectors.DATA_SOURCE_AVAILABLE_SEARCH_BAR}
          autoFocus
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
            const { title, description } = source;
            const fTitle = formatHandlerTitle(title);
            const HandlerIcon = handlerMapper(fTitle);
            const TypeIcon = typeMapper(fTitle);
            return (
              <TableRow>
                <TableIconCell>
                  <TableIcon>{HandlerIcon && <HandlerIcon />}</TableIcon>
                  {fTitle}
                </TableIconCell>
                <TableIconCell>
                  <TableIcon>{TypeIcon && <TypeIcon />}</TableIcon>
                  Free
                </TableIconCell>
                <TableCell>{description}</TableCell>
                <TableActionCell
                  data-intro={`${selectors.DATA_SOURCE_AVAILABLE}-${key}`}
                >
                  <Tooltip
                    title="Add connector"
                    placement="left"
                    aria-label="add connector"
                  >
                    <IconButton onClick={onAddClick(source, key)}>
                      <Add />
                    </IconButton>
                  </Tooltip>
                </TableActionCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
