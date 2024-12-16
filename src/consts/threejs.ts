import { MeshBasicMaterial, Vector3 } from "three";

export const DEFAULT_POSITION = { x: 0, y: 0, z: 0 };
export const DEFAULT_VECTOR_POSITION = new Vector3(0, 0, 0);

export const GREEN_SCREEN = new MeshBasicMaterial({
  color: "#00ff00",
});
