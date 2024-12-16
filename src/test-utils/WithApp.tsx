import React, { PropsWithChildren } from "react";

import { IWithStoreState, WithStore } from "./WithStore";
import { WithRouter } from "./WithRouter";

type WithAppProps = PropsWithChildren<{
  state?: IWithStoreState;
  path?: string;
}>;

export function WithApp({ children, state, path = "/" }: WithAppProps) {
  return (
    <WithRouter path={path}>
      <WithStore state={state}>{children}</WithStore>
    </WithRouter>
  );
}
