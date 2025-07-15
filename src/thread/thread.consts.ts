export const THREAD_EVENTS = {
  UPDATE_SCENE: "scene:update",
  TRIGGERED: "scene:triggered-update",
  MESH_ADDED: "scene:mesh-added",
};

export const RUNTIME_TYPES = {
  STANDARD: "standard",
  VR: "vr",
} as const;

export type RuntimeType = (typeof RUNTIME_TYPES)[keyof typeof RUNTIME_TYPES];
