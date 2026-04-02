import { mousePositionHandler } from "./handlers/mouseMoveHandler";

export const COORDINATE_SPACE_OPTIONS = [
  { value: "normalized", label: "Normalized (0..1)" },
  { value: "screen", label: "Screen Pixels" },
  { value: "element", label: "Relative to Element" },
];

export const BUTTON_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: "middle", label: "Middle" },
];

export const MODE_OPTIONS = [
  { value: "toggle", label: "Toggle (flip on click)" },
  { value: "momentary", label: "Momentary (held)" },
];

export const PERIPHERAL_INTERACTION_KEYS = {
  MOUSE_POSITION: "mousePosition",
  MOUSE_CLICK: "mouseClick",
  KEY_STROKE: "keyStroke",
  SCROLL: "scroll",
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
  KEY_STROKE: "keypress",
};
export const EVENT_KEY_MAP = {
  [PERIPHERAL_INTERACTION_KEYS.MOUSE_POSITION]: EVENT_KEYS.MOUSE_MOVE,
  [PERIPHERAL_INTERACTION_KEYS.MOUSE_CLICK]: EVENT_KEYS.MOUSE_CLICK,
  [PERIPHERAL_INTERACTION_KEYS.KEY_STROKE]: EVENT_KEYS.KEY_STROKE,
  [PERIPHERAL_INTERACTION_KEYS.SCROLL]: EVENT_KEYS.SCROLL,
};

export const EVENT_HANDLER_MAP = {
  [PERIPHERAL_INTERACTION_KEYS.MOUSE_POSITION]: mousePositionHandler,
};
