import React from 'react';

import { EditorWrapper as Props } from '../../../../types';
import { useStyles } from './useStyles';

export const EditorWrapper: React.FC<Props> = ({ children, gapBottom }) => {
  const { editorsWrapper } = useStyles({ gapBottom });
  return <section className={editorsWrapper}>{children}</section>;
};
