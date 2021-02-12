import React from 'react';
import { Controller } from 'react-hook-form';
import { Search, Close, Add } from '@material-ui/icons';

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
import { ReactComponent as JsonSchema } from '../../../icons/JsonSchema.svg';
import { ReactComponent as GraphQL } from '../../../icons/GraphQL.svg';
import { ReactComponent as Grpc } from '../../../icons/Grpc.svg';
import { ReactComponent as MySQL } from '../../../icons/MySQL.svg';
import { ReactComponent as Mesh } from '../../../icons/Mesh.svg';
import { ReactComponent as Neo4j } from '../../../icons/Neo4j.svg';
import { ReactComponent as OData } from '../../../icons/OData.svg';

const ICON_MAPPER: { [key: string]: any } = {
  GraphQL: GraphQL,
  Grpc: Grpc,
  JsonSchema: JsonSchema,
  MySQL: MySQL,
  Neo4j: Neo4j,
  OData: OData,
};

const getIcon = (key: string) => ICON_MAPPER[key] || null;

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

  const { form, searchIcon, svg } = useStyles();

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
            const { title, description } = source;
            const fTitle = formatHandlerTitle(title);
            const HandlerIcon = getIcon(fTitle);
            return (
              <TableRow key={key}>
                <TableIconCell>
                  <TableIcon>
                    {HandlerIcon && <HandlerIcon className={svg} />}
                  </TableIcon>
                  {fTitle}
                </TableIconCell>
                <TableIconCell>
                  <TableIcon>
                    <Mesh className={svg} />
                  </TableIcon>
                  Free
                </TableIconCell>
                <TableCell>{description}</TableCell>
                <TableActionCell>
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
                </TableActionCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
