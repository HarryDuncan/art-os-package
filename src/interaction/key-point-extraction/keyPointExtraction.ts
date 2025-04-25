import { Vector2 } from "three";
import { EVENT_KEYS } from "../../consts/interaction.consts";

export const mouseMoveKeyPoints = (event: MouseEvent) => {
  return {
    x: event.clientX,
    y: event.clientY,
    position: new Vector2(event.clientX / 100, event.clientY / 100),
  };
};

export const KEY_POINT_EXTRACTORS = {
  [EVENT_KEYS.MOUSE_MOVE]: mouseMoveKeyPoints,
};
