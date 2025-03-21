import { AXIS, } from "../../../../utils/three-dimension-space/position/position.types";
export const updateObjectPosition = (object, value, axis) => {
    const { position: { x, y, z }, } = object;
    switch (axis) {
        case AXIS.X:
            object.position.set(value, y, z);
            break;
        case AXIS.Y:
            object.position.set(x, value, z);
            break;
        case AXIS.Z:
        default:
            object.position.set(x, y, value);
    }
};
