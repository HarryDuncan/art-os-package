import { isDebugLoggingEnabled } from "./debugLogging";

/**
 * Drop-in console wrapper: errors always emit; log/warn/info/debug only when
 * debug logging is enabled (localhost, non-production NODE_ENV, or override).
 */
export const packageConsole = {
  log: (...args: unknown[]) => {
    if (isDebugLoggingEnabled()) console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDebugLoggingEnabled()) console.warn(...args);
  },
  info: (...args: unknown[]) => {
    if (isDebugLoggingEnabled()) console.info(...args);
  },
  debug: (...args: unknown[]) => {
    if (isDebugLoggingEnabled()) console.debug(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  },
};
