import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  playground: {
    height: '30rem',
    marginTop: spacing(4),
  },
  editor: {
    '& >.cm-s-dracula.CodeMirror, & > .cm-s-dracula .CodeMirror-gutters': {
      background: 'transparent !important',
    },
  },
}));
