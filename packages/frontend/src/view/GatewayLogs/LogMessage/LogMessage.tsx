import React, { useState, useRef, useEffect } from 'react';
import { useStyles } from './useStyles';
import { KeyboardArrowRight, KeyboardArrowDown } from '@material-ui/icons';

export const LogMessage: React.FC<{ message: string }> = ({ message }) => {
  const { closedLog, openLog, arrowIcon, unclickableArrowIcon } = useStyles();
  const [isUnclickableArrowIcon, setIsUnclickableArrowIcon] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const messageRef = useRef<HTMLSpanElement>();

  useEffect(() => {
    const messageWidth = messageRef?.current?.offsetWidth
      ? messageRef.current?.offsetWidth + 10
      : 0;
    const parentWidth = messageRef?.current?.parentElement?.clientWidth || 0;
    const isUnclickable = messageWidth < parentWidth;
    if (isUnclickable) setIsOpen(false);
    setIsUnclickableArrowIcon(isUnclickable);
  }, [messageRef, message]);

  return (
    <span ref={messageRef as React.LegacyRef<HTMLSpanElement>}>
      <span
        className={`${arrowIcon} ${
          isUnclickableArrowIcon && unclickableArrowIcon
        }`}
        onClick={() => {
          if (isUnclickableArrowIcon) return;
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
      </span>
      <span className={isOpen ? openLog : closedLog}>{message}</span>
    </span>
  );
};
