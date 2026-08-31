import { Material, Object3D, Scene, Vector3 } from "three";
import { CONTROLLER_TYPE } from "../config/material/shaders/schema/controls/consts";
import { ParameterControlConfig } from "../config/material/shaders/schema/controls/types";
import { isLightUniformSelectable } from "./lightSelectable";

export type LightUniformTarget = {
  materialId: string;
  uniformKey: string;
  position: Vector3;
};

const getPrimaryMaterial = (object: Object3D): Material | null => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = (object as any).material as Material | Material[] | undefined;
  if (!material) return null;
  return Array.isArray(material) ? material[0] ?? null : material;
};

const readVec3 = (value: unknown): Vector3 | null => {
  if (value instanceof Vector3) {
    return value.clone();
  }
  if (
    value &&
    typeof value === "object" &&
    "x" in value &&
    "y" in value &&
    "z" in value
  ) {
    const v = value as { x: number; y: number; z: number };
    return new Vector3(v.x, v.y, v.z);
  }
  return null;
};

/** Discover POSITION uniforms that are currently selectable. */
export const findSelectableLightUniforms = (
  scene: Scene,
): LightUniformTarget[] => {
  const seen = new Set<string>();
  const targets: LightUniformTarget[] = [];

  scene.traverse((child) => {
    const material = getPrimaryMaterial(child);
    if (!material?.name) return;

    const materialId = material.name;
    const controlsByUniform =
      (material.userData?.parameterControls as
        | Record<string, ParameterControlConfig>
        | undefined) ?? {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniforms = (material as any).uniforms as
      | Record<string, { value: unknown }>
      | undefined;
    if (!uniforms) return;

    for (const [uniformKey, control] of Object.entries(controlsByUniform)) {
      if (control?.controllerType !== CONTROLLER_TYPE.POSITION) continue;
      if (!isLightUniformSelectable(materialId, uniformKey, control)) continue;

      const dedupeKey = `${materialId}::${uniformKey}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      const position = readVec3(uniforms[uniformKey]?.value);
      if (!position) continue;

      targets.push({ materialId, uniformKey, position });
    }
  });

  return targets;
};
