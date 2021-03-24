import React from 'react';
import { WidgetBody, HugeWidget, Header } from '../../ui';
import { useStyles } from './useStyles';
import { Log as ILog } from '../../types';
import { useGatewayLogs } from '../../presenter/GatewayLogs';

export const GatewayLogs: React.FC = () => {
  const { data } = useGatewayLogs();

  const {
    logWraper,
    errorLog,
    infoLog,
    debugLog,
    warnLog,
    messageWrapper,
    content,
  } = useStyles();
  const levels: { [key: string]: string } = {
    error: errorLog,
    log: infoLog,
    debug: debugLog,
    warn: warnLog,
  };

  return (
    <>
      <Header title="Gateway Logs" />
      <HugeWidget>
        <WidgetBody>
          <div className={content}>
            {data.map(
              ({
                nodeId,
                hostname,
                prefix,
                message,
                level,
                timestamp,
              }: ILog) => (
                <span className={logWraper}>
                  <span className={levels[level] || levels.log}>
                    {timestamp}:{hostname}:{nodeId}:{prefix}:{level}:
                  </span>
                  <span className={messageWrapper}>{message}</span>
                </span>
              )
            )}
          </div>
        </WidgetBody>
      </HugeWidget>
    </>
  );
};
