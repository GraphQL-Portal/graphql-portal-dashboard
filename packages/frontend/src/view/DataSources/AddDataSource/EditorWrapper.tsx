import React from 'react';

import { useStyles } from './useStyles';
import { EditorWrapper as Props } from './types';

export const EditorWrapper:React.FC<Props> = ({ children, gapBottom }) => {
  const { editorsWrapper } = useStyles({ gapBottom });
  return <section className={editorsWrapper}>{children}</section>;
}
