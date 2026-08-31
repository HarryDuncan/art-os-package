import { Material, Object3D } from "three";
import { CONTROLLER_TYPE } from "../config/material/shaders/schema/controls/consts";
import { ParameterControlConfig } from "../config/material/shaders/schema/controls/types";
import { getRegisteredParameterControlScene } from "./register";
import {
  isLightUniformSelectable as isLightUniformSelectableWithConfig,
  setLightUniformSelectable,
  withEffectiveLightSelectable,
  clearLightUniformSelectableOverrides,
} from "./lightSelectable";

const getPrimaryMaterial = (object: Object3D): Material | null => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = (object as any).material as Material | Material[] | undefined;
  if (!material) return null;
  return Array.isArray(material) ? material[0] ?? null : material;
};

const findControlsConfig = (
  materialId: string,
  uniformKey: string,
): ParameterControlConfig | null => {
  const scene = getRegisteredParameterControlScene();
  if (!scene) return null;

  let found: ParameterControlConfig | null = null;
  scene.traverse((child) => {
    if (found) return;
    const material = getPrimaryMaterial(child);
    if (!material || material.name !== materialId) return;
    const controlsByUniform =
      (material.userData?.parameterControls as
        | Record<string, ParameterControlConfig>
        | undefined) ?? {};
    found = controlsByUniform[uniformKey] ?? null;
  });
  return found;
};

/** Read effective selectable (runtime override ?? stamped POSITION config). */
export const isLightUniformSelectable = (
  materialId: string,
  uniformKey: string,
): boolean => {
  const controlsConfig = findControlsConfig(materialId, uniformKey);
  if (
    controlsConfig &&
    controlsConfig.controllerType !== CONTROLLER_TYPE.POSITION
  ) {
    return false;
  }
  return isLightUniformSelectableWithConfig(
    materialId,
    uniformKey,
    controlsConfig,
  );
};

export {
  setLightUniformSelectable,
  withEffectiveLightSelectable,
  clearLightUniformSelectableOverrides,
};
