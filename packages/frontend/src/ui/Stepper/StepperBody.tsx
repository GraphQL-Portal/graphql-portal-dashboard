import React, { cloneElement, Children } from 'react';

export const StepperBody: React.FC<{ step: number }> = ({ children, step }) => {
  return (
    <>
      {Children.map(children, (child, idx) =>
        idx === step ? cloneElement(child as React.ReactElement<any>) : null
      )}
    </>
  );
};
