import { useMemo } from "react";
import { Camera, MOUSE, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { ControlConfig } from "config/config.types";

export const useOrbitControls = (
  camera: Camera,
  renderer: WebGLRenderer | CSS3DRenderer,
  config?: Partial<ControlConfig>
) => {
  return useMemo(() => {
    if (!camera || !renderer || !renderer.domElement || !config) return null;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional
    controls.mouseButtons = {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };

    controls.screenSpacePanning = false;
    controls.enablePan = false;
    Object.keys(config).forEach((key) => {
      const controlKey = key as keyof OrbitControls;
      const configValue = config[key as keyof ControlConfig];
      // @ts-ignore
      controls[controlKey] = configValue;
    });
    return controls;
  }, [renderer, camera, config]);
};
