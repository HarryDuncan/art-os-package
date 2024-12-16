import { InteractiveScene } from "components/interactive-scene/InteractiveScene";
import { SceneProperties } from "config/config.types";

export const setSceneProperties = (
  sceneProperties: SceneProperties | undefined,
  scene: InteractiveScene
) => {
  if (!sceneProperties) return;
  if (sceneProperties.background !== null) {
    // @ts-ignore
    scene.background = sceneProperties?.background ?? null;
  }
  const sceneId = sceneProperties.sceneId ?? "";
  scene.guid = sceneId;
};
