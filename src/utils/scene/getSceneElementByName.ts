import { GENERIC_TARGET_IDENTIFIERS } from "../../consts";
import { getLightsByIdentifier } from "./object-finding/getLightsByIdentifer";
import { getMeshesByIdentifier } from "./object-finding/getMeshesByIdentifier";
import { Object3D, Scene } from "three";

export const getSceneElementByName = (scene: Scene, identifiers: string[]) => {
  const uniqueIdentifiers = [...new Set(identifiers)];
  const allObjects = uniqueIdentifiers.reduce((acc: Object3D[], identifier) => {
    if (
      identifier.includes("light") ||
      identifier === GENERIC_TARGET_IDENTIFIERS.LIGHTS
    ) {
      return [...acc, ...getLightsByIdentifier(scene, identifier)];
    }
    return [...acc, ...getMeshesByIdentifier(scene, identifier)];
  }, []);

  return allObjects;
};
