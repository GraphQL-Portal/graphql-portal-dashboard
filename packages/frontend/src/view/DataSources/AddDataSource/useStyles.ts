import { makeStyles, Theme } from '@material-ui/core';

import { EditorWrapper } from './types';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  backButton: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: palette.text.primary,

    '& > svg': {
      display: 'block',
      marginRight: spacing(1.5),
    },

    '& > h3': {
      lineHeight: 0.8,
    },
  },
  code: {
    '& .jsoneditor': {
      '& .jsoneditor-menu': {
        backgroundColor: palette.primary.main,
      },
    },
  },
  schema: {
    '& .jsoneditor': {
      paddingBottom: spacing(2),

      '& .jsoneditor-menu': {
        backgroundColor: palette.secondary.main,
      },
    },
  },
  visibleOverflow: {
    overflow: 'visible',
  },
  editorsWrapper: {
    display: 'flex',
    marginBottom: ({ gapBottom }: EditorWrapper) => spacing(gapBottom || 0),
  },
  editorCell: {
    flexGrow: 0,
    width: '50%',

    '&:first-child': {
      paddingRight: spacing(1),
    },
    '&:last-child': {
      paddingLeft: spacing(1),
    },
  },
  editorHeader: {
    marginBottom: spacing(1),
  },
  editorErrorHeader: {
    color: palette.error.main,
  },
  editor: {
    height: '100%',
    '& .jsoneditor': {
      border: 0,
      backgroundColor: 'white',
      borderRadius: 4,

      '&-search': {
        top: 8,
        right: 8,
      },

      '&-poweredBy': {
        display: 'none',
      },

      '& .jsoneditor-menu': {
        border: 0,
        padding: spacing(1),
        height: 'auto',

        borderRadius: '4px 4px 0 0',

        '& > button': {
          float: 'none',
          cursor: 'pointer',
          margin: 0,
          marginRight: spacing(1),

          '&:disabled': {
            border: '1px solid transparent',
          },
        },
      },

      '& .jsoneditor-outer': {
        // height: 'auto',
        marginTop: -43,
        paddingTop: 43,
      },
    },
  },
}));
