import { useRef, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import vest, { enforce, test } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useCreateApiDef } from '../../model/ApiDefs/commands';
import { useSources } from '../../model/DataSources/queries';
import { useFormErrors } from '../../model/Hooks';
import { arrayStringFromObjectArray } from '../DataSources/helpers';
import { TriggersTable, AnyTable, SelectOption } from '../../types';
import { ROUTES } from '../../model/providers';

const suite = vest.create(
  'create_new_api',
  ({ name, endpoint, authentication }) => {
    test('name', 'Name is required', () => {
      enforce(name).isNotEmpty();
    });

    test('endpoint', 'Endpoint is required', () => {
      enforce(endpoint).isNotEmpty();
    });

    test('endpoint', 'Endpoint should match pattern "^/"', () => {
      enforce(endpoint).matches(/^\//);
    });

    const { auth_header_name, auth_tokens = [] } = authentication;

    if (!!auth_header_name) {
      test('auth_tokens', 'Auth header tokens is required', () => {
        enforce(auth_tokens).isArray();
      });

      test('auth_tokens', 'Auth header tokens is required', () => {
        enforce(auth_tokens[0].value).isNotEmpty();
      });
    }

    if (auth_tokens.length > 0 && !!auth_tokens[0].value) {
      test(
        'authentication.auth_header_name',
        'Auth key header is required',
        () => {
          enforce(auth_header_name).isNotEmpty();
        }
      );
    }
  }
);

export const useCreateApi = () => {
  const { push } = useHistory();
  const { createApiDef } = useCreateApiDef({
    onCompleted: () => push(ROUTES.APIS),
  });
  const ref = useRef<TriggersTable>({});
  const ref2 = useRef<AnyTable>({});

  const { data, loading } = useSources();
  const { control, errors, handleSubmit, watch, setValue } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      endpoint: '',
      source: '',
      sources: [],
      authentication: {
        auth_header_name: '',
        auth_tokens: [],
      },
    },
    resolver: vestResolver(suite),
  });

  useFormErrors(errors);

  const {
    fields: tokenFields,
    append: addToken,
    remove: removeToken,
  } = useFieldArray({ control, name: 'authentication.auth_tokens' });

  const {
    fields: sourceFields,
    append: addSource,
    remove: removeSource,
  } = useFieldArray({ control, name: 'sources' });

  useEffect(() => {
    const { triggers, table } = data.reduce(
      (acc: { triggers: TriggersTable; table: AnyTable }, source: any) => {
        const { name } = source;
        acc.triggers[name] = false;
        acc.table[name] = source;
        return acc;
      },
      { triggers: {}, table: {} }
    );
    ref.current = triggers;
    ref2.current = table;
    return () => {
      ref.current = {};
      ref2.current = {};
    };
  }, [data.length]);

  const source = watch('source');

  const onAddSource = () => {
    if (!!source) {
      setValue('source', '');
      ref.current[source] = true;
      addSource({ value: source });
    }
  };

  const onRemoveSource = (idx: number) => () => {
    ref.current[sourceFields[idx].value] = false;
    removeSource(idx);
  };

  const options = data.reduce(
    (acc: SelectOption[], { name }: any) => {
      return ref.current[name] ? acc : acc.concat({ label: name, value: name });
    },
    [{ label: '-', value: '' }]
  );

  const connected = sourceFields.map(
    ({ value }: Record<string, string>) => ref2.current[value]
  );

  const onSubmit = ({ authentication, name, endpoint }: any) => {
    const { auth_header_name, auth_tokens } = authentication;
    const auth = !!auth_header_name
      ? {
          authentication: {
            auth_header_name,
            auth_tokens: arrayStringFromObjectArray(auth_tokens),
          },
        }
      : {};
    createApiDef({
      variables: {
        apiDef: {
          name,
          endpoint,
          ...auth,
        },
        sources: sourceFields.map(
          ({ value }: Record<string, string>) => ref2.current[value]._id
        ),
      },
    });
  };

  return {
    loading,
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
    options,
    tokenFields,
    addToken,
    removeToken,
    connected,
    onAddSource,
    onRemoveSource,
  };
};
