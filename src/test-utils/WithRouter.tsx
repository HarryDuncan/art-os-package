import { Route, Router } from "react-router";
import { createBrowserHistory } from "history";
import React, { PropsWithChildren } from "react";

type IProps = PropsWithChildren<{ path?: string }>;

export function WithRouter({ path = "/", children }: IProps) {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Route path={path}>{children}</Route>
    </Router>
  );
}
