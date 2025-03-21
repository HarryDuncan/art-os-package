import { Vector3 } from "three";
export const positionConfigToVector3 = (position) => {
    const { x, y, z } = position;
    return new Vector3(x !== null && x !== void 0 ? x : 0, y !== null && y !== void 0 ? y : 0, z !== null && z !== void 0 ? z : 0);
};
