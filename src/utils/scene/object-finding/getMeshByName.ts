import { Mesh, Scene } from "three";

export const getMeshByName = (scene: Scene, meshName: string): Mesh | null => {
  const selectedMesh = scene.children.find((child) => child.name === meshName);
  return (selectedMesh as Mesh) ?? null;
};
