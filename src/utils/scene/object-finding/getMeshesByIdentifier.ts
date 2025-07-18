import { Scene } from "three";
import { ExtendedMesh } from "../../../config/mesh/types";

export const getMeshesByIdentifier = (scene: Scene, identifier: string) => {
  const children = scene.children as ExtendedMesh[];
  const selectedMeshes = children.flatMap((child) => {
    if (child.name && child.name.indexOf(identifier) !== -1) {
      return child;
    }
    if (child.groupId && child.groupId === identifier) {
      return child;
    }
    return [];
  });
  return selectedMeshes;
};
