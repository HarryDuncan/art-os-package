import { EVENT_KEYS } from "../../consts/interaction.consts";

export const mouseMoveKeyPoints = (event: MouseEvent) => {
  return {
    x: event.clientX,
    y: event.clientY,
    position: [event.clientX, event.clientY],
  };
};

export const KEY_POINT_EXTRACTORS = {
  [EVENT_KEYS.MOUSE_MOVE]: mouseMoveKeyPoints,
};
