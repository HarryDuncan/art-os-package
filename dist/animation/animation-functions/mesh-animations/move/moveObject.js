import { calculatePositionDistance } from "../../../../utils/three-dimension-space/calculatePositionDistance";
export const moveObject = (mesh, progress, moveTo, moveFrom, count) => {
    const prog = count % 2 === 0 ? 1.0 - progress : progress;
    // get distance for each axis
    const distance = calculatePositionDistance(moveFrom, moveTo);
    // set obj position as distance * progress
    const newX = moveFrom.x + distance.x * prog;
    const newY = moveFrom.y + distance.y * prog;
    const newZ = moveFrom.z + distance.z * prog;
    mesh.position.set(newX, newY, newZ);
};
