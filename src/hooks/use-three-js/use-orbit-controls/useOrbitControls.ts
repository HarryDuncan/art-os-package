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

    if (config) {
      controls.enabled = config.enabled;
      controls.enableZoom = config.enableZoom;
      controls.enablePan = config.enablePan;
      controls.enableRotate = config.enableRotate;
      controls.autoRotate = config.autoRotate;
      controls.autoRotateSpeed = config.autoRotateSpeed;
      controls.target.set(config.target?.x, config.target?.y, config.target?.z);
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
