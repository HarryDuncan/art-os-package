import { InteractiveScene } from "../../components/interactive-scene/InteractiveScene";
import { SceneProperties } from "../../types/config.types";

export const setSceneProperties = (
  sceneProperties: SceneProperties | undefined,
  scene: InteractiveScene
) => {
  if (!sceneProperties) return;
  if (sceneProperties.background) {
    scene.background = sceneProperties?.background;
  }
  const sceneId = sceneProperties.sceneId ?? "";
  scene.guid = sceneId;
};
