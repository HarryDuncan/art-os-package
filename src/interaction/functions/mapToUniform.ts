import { Mesh, Scene } from "three";
import { InteractionConfig } from "../interaction.types";

export const mapToUniform = (
  scene: Scene,
  eventData: Record<string, unknown>,
  interactionConfig: InteractionConfig
) => {
  const { materialIds } = interactionConfig;
  console.log(eventData);
  if (!materialIds) return;

  const meshes = scene.children.flatMap((child) => {
    if (child) {
      // @ts-expect-error
      return child?.material?.name === materialIds[0] ? child : [];
    }
    return [];
  });

  console.log(meshes);
  if (!meshes) return;
};
