import { useCallback, useEffect, useState } from "react";
import { Camera, MOUSE, WebGLRenderer } from "three";
import { ControlConfig } from "../../../config/config.types";

export const useOrbitControls = (
  camera: Camera,
  renderer: WebGLRenderer,
  config?: Partial<ControlConfig>
) => {
  const [orbitControls, setOrbitControls] = useState<any | null>(null);
  const loadOrbitControls = useCallback(async () => {
    const { OrbitControls } = await import(
      "three/examples/jsm/controls/OrbitControls.js"
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI;
    controls.mouseButtons = {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };

    if (config && controls) {
      controls.enabled = config.enabled ?? false;
      controls.enableZoom = config.enableZoom ?? false;
      controls.enablePan = config.enablePan ?? false;
      controls.enableRotate = config.enableRotate ?? false;
      controls.autoRotate = config.autoRotate ?? false;
      controls.autoRotateSpeed = config.autoRotateSpeed ?? 0;
      //     controls.target.set(config.target?.x, config.target?.y, config.target?.z);
    }

    setOrbitControls(controls);
  }, [camera, renderer, config]);

  useEffect(() => {
    if (!orbitControls) {
      loadOrbitControls();
    }
  }, [orbitControls, loadOrbitControls]);

  return orbitControls;
};
