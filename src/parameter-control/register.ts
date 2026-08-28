import { Camera, Scene } from "three";

let registeredScene: Scene | null = null;
let registeredCamera: Camera | null = null;

export const registerParameterControlContext = (
  scene: Scene,
  camera: Camera,
) => {
  registeredScene = scene;
  registeredCamera = camera;
};

export const deregisterParameterControlContext = () => {
  registeredScene = null;
  registeredCamera = null;
};

export const getRegisteredParameterControlScene = (): Scene | null =>
  registeredScene;

export const getRegisteredParameterControlCamera = (): Camera | null =>
  registeredCamera;
