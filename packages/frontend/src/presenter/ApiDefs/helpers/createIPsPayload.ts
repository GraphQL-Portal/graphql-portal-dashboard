import { StringArray } from '../../../types';
import { arrayStringFromObjectArray } from '../../DataSources/helpers';

export const createIPsPayload = (
  enable_ip_filtering: boolean = false,
  allow_ips: StringArray = [],
  deny_ips: StringArray = []
) => {
  return {
    enable_ip_filtering,
    allow_ips: !enable_ip_filtering
      ? []
      : arrayStringFromObjectArray(allow_ips),
    deny_ips: !enable_ip_filtering ? [] : arrayStringFromObjectArray(deny_ips),
  };
};
