import { PERIPHERAL_KEY_POINT_VALUES } from "./peripheral-interactions/peripheralInteractions.consts";

export const EVENT_BIND_TYPES = {
  SCENE: "SCENE",
  MATERIAL: "MATERIAL",
};

export const MATERIAL_FUNCTIONS = {
  MAP_TO_UNIFORM: "mapToUniform",
};

export const INTERACTION_SOURCES = {
  PERIPHERAL_INPUT: "PERIPHERAL_INPUT",
  POSE_ESTIMATION: "POSE_ESTIMATION",
  MASK_DETECTION: "MASK_DETECTION",
};

export const KEYPOINT_VALUES = {
  ...PERIPHERAL_KEY_POINT_VALUES,
};
export const EVENT_TYPES = {
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  MOUSE_MOVE: "mousemove",
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  MOUSE_ENTER: "mouseenter",
  MOUSE_LEAVE: "mouseleave",
};

export const EXTERNAL_INTERACTIONS = [
  INTERACTION_SOURCES.POSE_ESTIMATION,
  INTERACTION_SOURCES.MASK_DETECTION,
];
