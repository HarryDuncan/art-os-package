import { InteractiveScene } from "../../components/interactive-scene/InteractiveScene";
import { FormattedSceneProperties } from "../../config/config.types";

export const setSceneProperties = (
  sceneProperties: FormattedSceneProperties | undefined,
  scene: InteractiveScene
) => {
  if (!sceneProperties) return;
  if (sceneProperties.backgroundTexture) {
    scene.background = sceneProperties.backgroundTexture;
  }
  const sceneId = sceneProperties.sceneId ?? "";
  scene.guid = sceneId;
};
