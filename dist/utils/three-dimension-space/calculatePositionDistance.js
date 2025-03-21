export const calculatePositionDistance = (position1, position2) => {
    const x = position1.x - position2.x;
    const y = position1.y - position2.y;
    const z = position1.z - position2.z;
    return { x, y, z };
};
