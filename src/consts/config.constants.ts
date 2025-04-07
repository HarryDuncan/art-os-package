export const DEFAULT_CONFIG = {
  threeJsConfig: {},
  assets: [],
  meshComponentConfigs: [],
  sceneMaterialConfigs: [],
  animationConfig: [],
  lightConfig: [],
  sceneComponentConfigs: [],
  interactionConfig: [],
  scenePropertiesConfig: {},
};

export const DEFAULT_SCENE_PROPERTIES = {
  viewWidth: "100vw",
  viewHeight: "100vh",
  backgroundColor: "white",
  backgroundUrl: "",
  position: "fixed",
};

export enum SceneConfigType {
  Master = "Master",
}
