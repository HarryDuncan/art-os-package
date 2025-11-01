import { useEffect } from 'react';
import { logger, LogEntry } from './logger';

export const useLoggerHandler = (onLog?: (entry: LogEntry) => void) => {
  useEffect(() => {
    if (onLog) {
      logger.setHandler(onLog);
      return () => {
        logger.removeHandler();
      };
    }
  }, [onLog]);
};

