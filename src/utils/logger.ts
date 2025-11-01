export type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: number;
  source?: string;
}

type LogHandler = (entry: LogEntry) => void;

class LoggerInstance {
  private handler: LogHandler | null = null;
  private buffer: LogEntry[] = [];

  setHandler(handler: LogHandler) {
    this.handler = handler;
    // Flush buffered logs
    this.buffer.forEach((entry) => handler(entry));
    this.buffer = [];
  }

  removeHandler() {
    this.handler = null;
  }

  private emit(level: LogLevel, message: string, data?: unknown, source?: string) {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: Date.now(),
      source,
    };

    if (this.handler) {
      this.handler(entry);
    } else {
      // Buffer logs until handler is set
      this.buffer.push(entry);
      // Limit buffer size to prevent memory issues
      if (this.buffer.length > 100) {
        this.buffer.shift();
      }
    }

    // Also log to console in development
    if (process.env.NODE_ENV !== 'production') {
      const consoleMethod = console[level] || console.log;
      consoleMethod(`[${level.toUpperCase()}]`, message, data || '');
    }
  }

  log(message: string, data?: unknown, source?: string) {
    this.emit('log', message, data, source);
  }

  warn(message: string, data?: unknown, source?: string) {
    this.emit('warn', message, data, source);
  }

  error(message: string, data?: unknown, source?: string) {
    this.emit('error', message, data, source);
  }

  info(message: string, data?: unknown, source?: string) {
    this.emit('info', message, data, source);
  }

  debug(message: string, data?: unknown, source?: string) {
    this.emit('debug', message, data, source);
  }
}

export const logger = new LoggerInstance();

// Convenience functions - import these anywhere!
export const log = (message: string, data?: unknown, source?: string) => {
  logger.log(message, data, source);
};

export const logWarn = (message: string, data?: unknown, source?: string) => {
  logger.warn(message, data, source);
};

export const logError = (message: string, data?: unknown, source?: string) => {
  logger.error(message, data, source);
};

export const logInfo = (message: string, data?: unknown, source?: string) => {
  logger.info(message, data, source);
};

export const logDebug = (message: string, data?: unknown, source?: string) => {
  logger.debug(message, data, source);
};

