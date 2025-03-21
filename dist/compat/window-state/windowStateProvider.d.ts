import { ReactNode } from "react";
import { WindowStateContextProps } from "./types";
export declare const useWindowState: () => WindowStateContextProps;
export declare const WindowStateProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
