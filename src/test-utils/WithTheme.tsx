import React, { PropsWithChildren } from "react";
import { THEME } from "theme";

import { ThemeProvider } from "styled-components/macro";

export function WithTheme({
  children,
}: PropsWithChildren<Record<never, never>>) {
  return <ThemeProvider theme={THEME}>{children}</ThemeProvider>;
}
