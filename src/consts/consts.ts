export const PROCESS_STATUS = {
  NOT_INITIALIZED: "Not initialized",
  FORMATTING_THREE: "Formatting three.js",
  INITIALIZING_FUNCTIONS: "Initializing functions",
  INITIALIZING_SCENE: "Initializing scene",
  INITIALIZING_THREAD: "Initializing thread",
  INITIALIZING_POST_PROCESSOR: "Initializing post processor",
  READY_TO_RENDER: "Ready to render",
  RUNNING: "Running",
  PAUSED: "Paused",
  STOPPED: "Stopped",
  ERROR: "Error",
};

export const SCENE_CONFIG_KEYS = {
  THREE_JS_CONFIG: "threeJsConfig",
  ASSETS: "assets",
  MESH_COMPONENT_CONFIGS: "meshComponentConfigs",
  SCENE_MATERIAL_CONFIGS: "sceneMaterialConfigs",
  ADVANCED_MESH_CONFIGS: "advancedMeshConfigs",
  MESH_TRANSFORMS: "meshTransforms",
};

export const NODE_KEYS = {
  MESH_COMPONENT_CONFIGS: "meshComponentConfigs",
  SCENE_MATERIAL_CONFIGS: "sceneMaterialConfigs",
  ASSETS: "assets",
  THREE_JS_CONFIG: "threeJsConfig",
  ANIMATION_CONFIG: "animationConfig",
};

export const BUILT_SHADER_CONFIG_KEYS = {
  VERTEX_EFFECTS_CONFIG: "vertexEffectsConfig",
  FRAGMENT_EFFECTS_CONFIG: "fragmentEffectsConfig",
  UNIFORM_CONFIG: "uniformConfig",
  ATTRIBUTE_CONFIG: "attributeConfig",
};
