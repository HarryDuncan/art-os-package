import { JSXElementConstructor, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { THEME } from "theme";
import { ThemeProvider } from "styled-components/macro";

export const renderWithTheme = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  const { rerender, ...rest } = render(
    <ThemeProvider theme={THEME}>{ui}</ThemeProvider>,
    options
  );
  return {
    ...rest,
    rerender: (
      rerenderUi: ReactElement<any, string | JSXElementConstructor<any>>
    ) => rerender(<ThemeProvider theme={THEME}>{rerenderUi}</ThemeProvider>),
  };
};
