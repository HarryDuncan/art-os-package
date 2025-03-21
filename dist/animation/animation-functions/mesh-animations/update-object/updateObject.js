import { updateObjectPosition } from "./updateObjectPosition";
import { AXIS, } from "../../../../utils/three-dimension-space/position/position.types";
import { OBJECT_UPDATE_PROPERTY } from "../../../../animation/animation.constants";
export const updateObject = (object, updatedValue, objectParameter, axis = AXIS.X) => {
    switch (objectParameter) {
        case OBJECT_UPDATE_PROPERTY.POSITION:
        default:
            updateObjectPosition(object, updatedValue, axis);
    }
};
