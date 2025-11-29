// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Scene } from "three";
import { InteractionConfig } from "../types";

export const mapToUniform = (
  scene: Scene,
  eventData: Record<string, unknown>,
  interactionConfig: InteractionConfig
) => {
  const { materialIds, uniformKeys, keyPointId } = interactionConfig;
  if (!materialIds) return;

  const meshes = scene.children.flatMap((child) => {
    if (child) {
      return materialIds.includes(child?.material?.name) ? child : [];
    }
    return [];
  });

  meshes.forEach((mesh) => {
    const uniforms = mesh?.material.uniforms;
    console.log("uniforms", uniforms);
    if (uniforms) {
      uniformKeys.forEach((uniformKey) => {
        if (uniforms[uniformKey]) {
          uniforms[uniformKey].value = eventData[keyPointId];
        }
      });
    }
  });
};
