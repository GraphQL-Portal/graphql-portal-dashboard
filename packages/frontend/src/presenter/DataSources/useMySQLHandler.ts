import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';
import { arrayObjectToObject } from './helpers';

const suite = vest.create('mysql_handler', ({ host, port, database, user, password }) => {
  test('host', 'Host is required', () => {
    enforce(host).isNotEmpty();
  });
  test('user', 'User is required', () => {
    enforce(user).isNotEmpty();
  });
  test('password', 'Password is required', () => {
    enforce(password).isNotEmpty();
  });
  test('port', 'Port is required', () => {
    enforce(port).isNotEmpty();
  });
  test('port', 'Port has to be numeric', () => {
    enforce(port).isNumeric();
  });
  test('database', 'Database is required', () => {
    enforce(database).isNotEmpty();
  });
});

const MYSQL_DEFAULT_STATE = {
  host: '',
  port: '',
  database: '',
  user: '',
  password: '',
  pool: [],
};

export const useMySQLHandler = ({ state, updateState }: HandlerStep) => {
  const handlerState = Object.assign({}, MYSQL_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });


  const {
    fields: poolFields,
    append: appendPoolField,
    remove: removePoolField,
  } = useFieldArray({
    control,
    name: 'pool',
  });

  useFormErrors(errors);

  const onSubmit = (data: any) => updateState({
    handler: {
      [SOURCE_NAMES.MYSQL]: {
        ...data,
        port: Number(data.port),
        pool: arrayObjectToObject(data.pool),
      }
    }
  });

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    poolFields,
    appendPoolField,
    removePoolField,
  };
};
