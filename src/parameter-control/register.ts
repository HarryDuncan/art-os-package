import { Camera, Scene } from "three";
import { resetMeshEdits } from "./meshEdits";

let registeredScene: Scene | null = null;
let registeredCamera: Camera | null = null;

export const registerParameterControlContext = (
  scene: Scene,
  camera: Camera,
) => {
  resetMeshEdits();
  registeredScene = scene;
  registeredCamera = camera;
};

export const deregisterParameterControlContext = () => {
  resetMeshEdits();
  registeredScene = null;
  registeredCamera = null;
};

export const getRegisteredParameterControlScene = (): Scene | null =>
  registeredScene;

export const getRegisteredParameterControlCamera = (): Camera | null =>
  registeredCamera;
