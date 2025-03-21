import React from "react";
import { Layer } from "../../../components/layers/types";
import { SceneProperties } from "../../../config/config.types";
interface IRootContainerProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    sceneProperties: SceneProperties;
    layers?: Layer[];
}
export declare const RootContainer: ({ containerRef, sceneProperties, layers, }: IRootContainerProps) => import("react/jsx-runtime").JSX.Element;
export {};
