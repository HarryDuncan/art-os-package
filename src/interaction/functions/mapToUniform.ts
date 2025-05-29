// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Scene } from "three";
import { InteractionConfig } from "../interaction.types";

export const mapToUniform = (
  scene: Scene,
  eventData: Record<string, unknown>,
  interactionConfig: InteractionConfig
) => {
  const { materialIds } = interactionConfig;

  if (!materialIds) return;

  const meshes = scene.children.flatMap((child) => {
    if (child) {
      return materialIds.includes(child?.material?.name) ? child : [];
    }
    return [];
  });

  meshes.forEach((mesh) => {
    const uniformKeys = Object.entries(mesh?.material.uniforms ?? {}).flatMap(
      ([key, uniform]) => {
        if (uniform && typeof uniform === "object" && "keyPointId" in uniform) {
          return key;
        }
        return [];
      }
    );

    Object.entries(eventData).forEach(([key, value]) => {
      uniformKeys.forEach((uniformKey) => {
        const uniforms = mesh?.material.uniforms;
        if (uniforms && uniforms[uniformKey]?.keyPointId === key) {
          uniforms[uniformKey].value = value;
        }
      });
    });
  });
};
