import { Object3D } from "three";
import { AXIS, Axis } from "../../../types/position.types";

export const spinMeshAlongAxis = (
  object: Object3D,
  axis: Axis,
  speed: number
) => {
  switch (axis) {
    case AXIS.X:
      object.rotation.x += speed;
      break;
    case AXIS.Y:
      object.rotation.y += speed;
      break;
    case AXIS.Z:
    default:
      object.rotation.z += speed;
      break;
  }
};
