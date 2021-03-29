import React, { useState, useRef, useEffect } from 'react';
import { useStyles } from './useStyles';
import { KeyboardArrowRight, KeyboardArrowDown } from '@material-ui/icons';

export const LogMessage: React.FC<{ message: string }> = ({ message }) => {
  const { closedLog, openLog, arrowIcon, unclickableArrowIcon } = useStyles();
  const [isUnclickableArrowIcon, setIsUnclickableArrowIcon] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const messageRef = useRef<HTMLSpanElement>();
  useEffect(() => {
    setIsUnclickableArrowIcon(
      (messageRef.current?.offsetWidth || 0) <
        (messageRef.current?.parentElement?.clientWidth || 0)
    );
  }, [messageRef]);

  return (
    <span ref={(span) => (messageRef.current = span || undefined)}>
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
