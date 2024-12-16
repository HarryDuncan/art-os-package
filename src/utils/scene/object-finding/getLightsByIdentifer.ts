import { Object3D, Scene } from "three";
import { GENERIC_TARGET_IDENTIFIERS } from "display/animation/animation.constants";

type CustomLightObject = Object3D & {
  isLight?: boolean;
  isAmbientLight?: boolean;
};
export const getLightsByIdentifier = (scene: Scene, identifier: string) => {
  const selectedLights = scene.children.filter(
    (child: CustomLightObject) =>
      child.isLight &&
      !child.isAmbientLight &&
      (identifier === GENERIC_TARGET_IDENTIFIERS.LIGHTS ||
        child.name.indexOf(identifier) !== -1)
  );
  return selectedLights;
};
