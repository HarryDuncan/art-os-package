export const rotateObjectToFaceCoordinate = (object, lookAtCoordinate) => {
    const { x, y, z } = lookAtCoordinate;
    const xyAngle = Math.atan2(y - object.position.y, x - object.position.x) - Math.PI / 2;
    const yzAngle = Math.atan2(z - object.position.z, y - object.position.y) - Math.PI / 2;
    object.rotation.set(xyAngle, yzAngle, 0);
};
