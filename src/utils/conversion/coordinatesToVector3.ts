import { Vector3 } from "three";
import { Position3d } from "../../types/position.types";

export const coordinatesToVector3 = (coordinate: Position3d) =>
  new Vector3(coordinate.x, coordinate.y, coordinate.z);
