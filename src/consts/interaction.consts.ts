import { SHADER_PROPERTY_VALUE_TYPES } from "../config/material/shaders/build-shader/constants/shader.consts";

export const EVENT_BIND_TYPES = {
  SCENE: "SCENE",
  MATERIAL: "MATERIAL",
};
export const EVENT_KEYS = {
  SCROLL: "scroll",
  MOUSE_MOVE: "mousemove",
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  MOUSE_ENTER: "mouseenter",
  MOUSE_LEAVE: "mouseleave",
  MOUSE_WHEEL: "mousewheel",
  MOUSE_OVER: "mouseover",
  MOUSE_OUT: "mouseout",
  MOUSE_CLICK: "click",
  MOUSE_DBL_CLICK: "dblclick",
  KEY_DOWN: "keydown",
  KEY_UP: "keyup",
  KEY_PRESS: "keypress",
  TOUCH_START: "touchstart",
  TOUCH_MOVE: "touchmove",
  TOUCH_END: "touchend",
  TOUCH_CANCEL: "touchcancel",
  RESIZE: "resize",
  WHEEL: "wheel",
};

export const MATERIAL_FUNCTIONS = {
  MAP_TO_UNIFORM: "mapToUniform",
};
export const INTERACTION_TYPES = {
  EXTERNAL: "external",
  INTERNAL: "internal",
};
export const KEY_POINT_VALUES = {
  [EVENT_KEYS.MOUSE_MOVE]: {
    x: {
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    },
    y: {
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
    },
    position: {
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    },
  },
};
