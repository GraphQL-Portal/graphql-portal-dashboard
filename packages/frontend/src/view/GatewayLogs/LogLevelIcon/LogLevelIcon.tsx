import React from 'react';
import { useStyles } from './useStyles';
import { LogLevel } from '../../../types';

export const LogLevelIcon: React.FC<{ level: LogLevel }> = ({ level }) => {
  const { errorLog, infoLog, debugLog, warnLog, logLevelIcon } = useStyles();
  const levels: { [key: string]: string } = {
    error: errorLog,
    log: infoLog,
    debug: debugLog,
    warn: warnLog,
  };
  const logLevelIconColor = levels[level] || levels.log;

  return <div className={`${logLevelIcon} ${logLevelIconColor}`}></div>;
};
