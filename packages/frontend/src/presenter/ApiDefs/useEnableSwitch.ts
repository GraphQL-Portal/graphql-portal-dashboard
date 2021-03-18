import { useState } from 'react';

import { useUpdateApiDef } from '../../model/ApiDefs/commands';
import { useToast } from '../../model/providers';
import { AError, UseEnableApiHook } from '../../types';
import { getProp } from '../../utils';

export const useEnableSwitch: UseEnableApiHook = ({ api, refetch }) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { _id: id, name, endpoint, enabled, sources } = api;

  const [disabled, setDisabled] = useState<boolean>(false);

  const { updateApiDef } = useUpdateApiDef({
    onCompleted() {
      refetch();
      setDisabled(false);
      showSuccessToast(`API ${name} successfully updated`);
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const onChange = (value: boolean) => {
    setDisabled(true);
    updateApiDef({
      variables: {
        id,
        apiDef: {
          name,
          endpoint,
        },
        sources: sources.map(getProp('_id')),
        enabled: value,
      },
    });
  };

  return { onChange, disabled, value: enabled };
};
