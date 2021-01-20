import React from 'react';

import { useStyles } from './useStyles';

export const EditorCell:React.FC = ({ children }) => {
  const { editorCell } = useStyles({});
  return (
    <div className={editorCell}>
      {children}
    </div>
  );
}
