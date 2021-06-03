import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { Loading } from '../../view/Loading';
import { useStyles } from './useStyles';

export const PrimaryButton: React.FC<ButtonProps & { loading?: boolean }> = (
  props
) => {
  const { loaderWrapper } = useStyles();

  if (props.loading) {
    return (
      <Button variant="contained" color="primary" {...props} disabled={true}>
        {props.children}
        <div className={loaderWrapper}>
          <Loading size={20} />
        </div>
      </Button>
    );
  }
  return <Button variant="contained" color="primary" {...props} />;
};
