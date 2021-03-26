import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  wrapper: {
    height: '30rem',
    marginTop: spacing(4),
  },
  playground: {
    '& .graphiql-container .doc-explorer-title-bar': {
      height: 47,
    },
  },
  editor: {
    '& .CodeMirror-wrap pre': {
      wordBreak: 'break-word',
    },
  },
  copyButton: {
    color: palette.text.secondary,
  },
  // playground: {
  //   '& .graphiql-container': {
  //     border: `1px solid ${palette.action.disabled}`,
  //     borderRadius: 4,
  //     color: palette.text.primary,

  //     '& .topBar': {
  //       background: 'transparent',
  //       borderBottomColor: palette.action.disabled,
  //       height: 48,
  //       padding: spacing(0, 2),
  //     },

  //     // hide run button to use ours ;)
  //     '& .execute-button-wrap': {
  //       display: 'none',
  //       visibility: 'hidden',
  //     },

  //     '& .CodeMirror': {
  //       borderRadius: 0,
  //       color: palette.text.primary,
  //       fontSize: '0.875rem',
  //     },

  //     '& .CodeMirror-gutters': {
  //       background: palette.action.disabled,
  //       color: palette.text.primary,
  //       border: 0,
  //       left: '0 !important',
  //     },

  //     '& .CodeMirror-cursor': {
  //       borderLeft: `10px solid ${palette.action.disabled}`,
  //     },

  //     '& .variable-editor-title': {
  //       background: 'transparent',
  //       borderColor: palette.action.disabled,
  //       height: 40,
  //       padding: 0,
  //       paddingLeft: spacing(6),
  //       textTransform: 'none',
  //       fontVariant: 'none',
  //       fontWeight: 400,
  //       display: 'flex',
  //       alignItems: 'center',

  //       '& > div': {
  //         color: `${palette.text.primary} !important`,
  //       },
  //     },

  //     '& .cm-punctuation': {
  //       color: palette.text.secondary,
  //     },

  //     '& .query-editor': {
  //       '& .cm-keyword, & .cm-attribute': {
  //         color: palette.primary.main,
  //       },

  //       '& .cm-def': {
  //         color: palette.error.dark,
  //       },

  //       '& .cm-variable': {
  //         color: palette.success.main,
  //       },

  //       '& .cm-atom': {
  //         color: palette.warning.main,
  //       },

  //       '& .cm-property': {
  //         color: palette.secondary.main,
  //       },
  //     },

  //     '& .variable-editor': {
  //       '& .cm-variable': {
  //         color: palette.success.main,
  //       },

  //       '& .cm-string': {
  //         color: palette.primary.light,
  //       },
  //     },

  //     '& .resultWrap': {
  //       border: 0,

  //       '& .CodeMirror': {
  //         background: 'transparent',
  //       },

  //       '& .cm-def': {
  //         color: palette.error.dark,
  //       },

  //       '& .cm-string': {
  //         color: palette.primary.light,
  //       },

  //       '& .cm-property': {
  //         color: palette.secondary.main,
  //       },

  //       '& .cm-number': {
  //         color: palette.success.main,
  //       },

  //       '& .cm-builtin': {
  //         color: palette.warning.main,
  //       },
  //     },

  //     '& .footer': {
  //       height: 0,
  //       position: 'static',
  //       border: 0,

  //       '&:before': {
  //         display: 'none',
  //       },
  //     },

  //     '& .docExplorerShow': {
  //       background: 'transparent',
  //       border: 0,
  //       borderBottom: `1px solid ${palette.action.disabled}`,
  //       color: palette.primary.main,
  //       padding: spacing(0, 2),

  //       '&:hover': {
  //         color: palette.primary.dark,

  //         '&:before': {
  //           borderColor: palette.primary.dark,
  //         },
  //       },

  //       '&:before': {
  //         borderColor: palette.primary.main,
  //         margin: 0,
  //         marginRight: spacing(1),
  //       },
  //     },

  //     '& .docExplorerWrap': {
  //       background: 'transparent',
  //       boxShadow: 'none',
  //       borderLeft: `1px solid ${palette.action.disabled}`,
  //     },

  //     '& .doc-explorer': {
  //       background: 'transparent',
  //       position: 'relative',
  //       height: '100%',
  //     },

  //     '& .doc-explorer-title-bar': {
  //       height: 48,
  //       padding: spacing(0, 2),
  //       display: 'flex',
  //       justifyContent: 'space-between',
  //       alignItems: 'center',
  //     },

  //     '& .doc-explorer-title': {
  //       display: 'inline-block',
  //       padding: spacing(0, 1),
  //       fontWeight: 400,
  //     },

  //     '& .docExplorerHide': {
  //       margin: 0,
  //       marginRight: spacing(-2),
  //       color: palette.text.secondary,

  //       '&:hover': {
  //         color: palette.error.dark,
  //       },
  //     },

  //     '& .doc-explorer-back': {
  //       margin: 0,
  //       marginLeft: spacing(-2),
  //       color: palette.primary.main,

  //       '&:before': {
  //         borderColor: palette.primary.main,
  //         margin: 0,
  //         marginRight: spacing(1),
  //       },
  //     },

  //     '& .doc-explorer-contents': {
  //       background: 'transparent',
  //       borderColor: palette.action.disabled,
  //       paddingLeft: spacing(2, 0, 0, 2),
  //     },

  //     '& .search-box': {
  //       margin: spacing(-2, 0, 2),
  //       padding: spacing(1, 2, 1, 0),
  //       borderColor: palette.action.disabled,

  //       '& > input': {
  //         background: 'transparent',
  //         padding: spacing(1, 2),
  //         color: palette.text.primary,
  //       },

  //       '& .search-box-clear': {
  //         background: palette.error.main,
  //         color: palette.text.primary,
  //         padding: '3px 5px',
  //       },
  //     },

  //     '& .doc-type-description': {
  //       paddingRight: spacing(2),
  //       lineHeight: 1.51,

  //       '& code': {
  //         background: palette.action.disabled,
  //         color: 'black',
  //         padding: spacing(0.5),
  //         border: 0,
  //         fontSize: '0.875rem',
  //       },
  //     },

  //     '& .doc-category-title': {
  //       borderColor: palette.action.disabled,
  //       color: palette.text.primary,
  //       fontVariant: 'none',
  //       fontWeight: 400,
  //       textTransform: 'capitalize',
  //       padding: spacing(1, 2, 1, 0),
  //       margin: 0,
  //       marginBottom: spacing(2),
  //     },

  //     '& .doc-category-item': {
  //       color: palette.text.secondary,
  //     },

  //     '& .keyword': {
  //       color: palette.primary.main,
  //     },

  //     '& .type-name': {
  //       color: palette.warning.main,
  //     },

  //     '& .field-name': {
  //       color: palette.secondary.main,
  //     },

  //     '& .arg-name': {
  //       color: palette.success.main,
  //     },
  //   },
  // },

  // run: {
  //   position: 'absolute',
  //   bottom: 20,
  //   left: 6,
  //   transform: 'translateX(-50%)',
  //   color: `${palette.text.primary} !important`,
  //   padding: 0,
  //   borderRadius: '50%',
  //   width: 48,
  //   height: 48,
  //   minWidth: 48,
  // },

  // editor: {
  //   '& .CodeMirror': {
  //     borderRadius: 4,
  //     color: palette.text.primary,
  //     border: `1px solid ${palette.action.disabled}`,
  //     fontSize: '0.875rem',
  //   },

  //   '& .CodeMirror-gutters': {
  //     background: palette.action.disabled,
  //     color: palette.text.primary,
  //     border: 0,
  //     left: '0 !important',
  //   },

  //   '& .cm-ws, & .cm-punctuation': {
  //     color: palette.text.secondary,
  //   },

  //   '& .cm-keyword': {
  //     color: palette.primary.main,
  //   },

  //   '& .cm-atom': {
  //     color: palette.warning.main,
  //   },

  //   '& .cm-property': {
  //     color: palette.secondary.main,
  //   },

  //   '& .cm-attribute': {
  //     color: palette.success.main,
  //   },
  // },
}));
