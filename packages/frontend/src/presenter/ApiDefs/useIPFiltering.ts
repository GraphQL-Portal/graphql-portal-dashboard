import { useFieldArray, useWatch } from 'react-hook-form';

import { UseIPFilteringHook } from '../../types';

export const useIPFiltering: UseIPFilteringHook = ({ control }) => {
  const enableIPFiltering = useWatch({ name: 'enable_ip_filtering', control });

  const {
    fields: allowedIP,
    append: addAllowedIP,
    remove: removeAllowedIP,
  } = useFieldArray({ control, name: 'allow_ips' });

  const {
    fields: deniedIP,
    append: addDeniedIP,
    remove: removeDeniedIP,
  } = useFieldArray({ control, name: 'deny_ips' });

  return {
    enableIPFiltering: !!enableIPFiltering,
    allowedIP,
    addAllowedIP,
    removeAllowedIP,
    deniedIP,
    addDeniedIP,
    removeDeniedIP,
  };
};
