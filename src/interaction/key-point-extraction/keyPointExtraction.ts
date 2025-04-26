import { Vector2 } from "three";
import { EVENT_KEYS } from "../../consts/interaction.consts";

export const mouseMoveKeyPoints = (event: MouseEvent) => {
  return {
    x: event.clientX,
    y: event.clientY,
    position: new Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      (event.clientY / window.innerHeight) * 2 + 1
    ),
  };
};

export const KEY_POINT_EXTRACTORS = {
  [EVENT_KEYS.MOUSE_MOVE]: mouseMoveKeyPoints,
};
