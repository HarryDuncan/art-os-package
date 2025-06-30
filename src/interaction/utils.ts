// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Scene } from "three";

export const setUniforms = (
  scene: Scene,
  materialIds: string[],
  uniformKeys: string[],
  eventData: Record<string, unknown>,
  keyPointId: string
) => {
  const meshes = scene?.children.flatMap((child) => {
    if (child) {
      return materialIds?.includes(child?.material?.name) ? child : [];
    }
    return [];
  });

  meshes?.forEach((mesh) => {
    const uniforms = mesh?.material?.uniforms;
    if (uniforms) {
      uniformKeys.forEach((uniformKey) => {
        if (uniforms[uniformKey]) {
          uniforms[uniformKey].value = eventData[keyPointId];
        }
      });
    }
  });
};
