export const setObjectPosition = (object, position) => {
    const { x, y, z } = position;
    object.position.set(x, y, z);
};
