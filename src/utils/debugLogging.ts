let debugOverride: boolean | null = null;

export const isLocalhost = (): boolean => {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]";
};

/**
 * @param enabled - `true`/`false` forces debug logging; `null` clears override
 *   and falls back to localhost / NODE_ENV detection.
 */
export const setDebugLogging = (enabled: boolean | null): void => {
  debugOverride = enabled;
};

export const isDebugLoggingEnabled = (): boolean => {
  if (debugOverride !== null) return debugOverride;
  if (isLocalhost()) return true;
  if (
    typeof process !== "undefined" &&
    process.env?.NODE_ENV !== "production"
  ) {
    return true;
  }
  return false;
};
