import { useRef } from 'react';
import GraphiQL from 'graphiql';

import { UseAPIPlaygroundHook } from '../../types';

export const useAPIPlayground: UseAPIPlaygroundHook = () => {
  const editor = useRef<GraphiQL | null>();
  const onRun = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    editor.current!.handleRunQuery();
  };

  return { editor, onRun };
};
