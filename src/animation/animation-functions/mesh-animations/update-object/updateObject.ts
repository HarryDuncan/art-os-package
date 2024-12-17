import { updateObjectPosition } from "./updateObjectPosition";
import { Object3D } from "three";
import { ObjectUpdateProperty } from "../../../animation.types";
import {
  AXIS,
  Axis,
} from "../../../../utils/three-dimension-space/position/position.types";
import { OBJECT_UPDATE_PROPERTY } from "../../../../animation/animation.constants";

export const updateObject = (
  object: Object3D,
  updatedValue: number,
  objectParameter: ObjectUpdateProperty,
  axis: Axis = AXIS.X as Axis
) => {
  switch (objectParameter) {
    case OBJECT_UPDATE_PROPERTY.POSITION:
    default:
      updateObjectPosition(object, updatedValue, axis);
  }
};
