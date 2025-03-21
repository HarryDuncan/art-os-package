import { AXIS, } from "../../../utils/three-dimension-space/position/position.types";
export const spinMeshAlongAxis = (object, axis, speed) => {
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
