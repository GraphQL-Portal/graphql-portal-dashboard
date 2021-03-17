import React, { useEffect } from 'react';
import { WidgetBody, HugeWidget, Header } from '../../ui';
import { useStyles } from './useStyles';
import { Log as ILog } from '../../types';
import { useGatewayLogsWithSubscription } from '../../presenter/GatewayLogs/useGatewayLogs';

export const Log: React.FC = () => {
  const { subscribeToNewComments, list } = useGatewayLogsWithSubscription();
  useEffect(() => {
    subscribeToNewComments();
  }, []);
  const { logWraper, errorLog, infoLog, messageWrapper, content } = useStyles();
  const levels: { error: string; info: string } = {
    error: errorLog,
    info: infoLog,
  };

  return (
    <>
      <Header title="Gateway Logs" />
      <HugeWidget>
        <WidgetBody>
          <div className={content}>
            {list.map(
              ({
                nodeId,
                hostname,
                prefix,
                message,
                level,
                timestamp,
              }: ILog) => (
                <span className={logWraper}>
                  <span className={levels[level] || levels.info}>
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
