import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  formCaption: {
    marginBottom: spacing(2),
  },
  formCaptionItem: {
    margin: 0,
    marginBottom: spacing(1),

    '& > span': {
      color: palette.text.secondary,
    }
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
