import { OrthographicCamera, PerspectiveCamera } from "three";
import { RendererParams } from "./renderer/renderer.types";
import { ControlConfig } from "../../config/config.types";
export type ThreeJsParams = {
    camera: PerspectiveCamera | OrthographicCamera;
    renderer?: RendererParams;
    controls?: Partial<ControlConfig>;
};
