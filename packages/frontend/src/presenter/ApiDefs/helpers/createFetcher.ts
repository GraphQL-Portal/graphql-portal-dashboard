import fetch from 'isomorphic-fetch';

import { RecordStringAny } from '../../../types';

export const createFetcher = (uri: string, headers: RecordStringAny = {}) => (
  body: any
) =>
  fetch(uri, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  }).then((response) => response.json().catch(() => response.text()));
