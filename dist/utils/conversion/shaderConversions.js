import { positionConfigToPosition } from "./conversion";
export const shaderSafeFloat = (value) => {
    return value.toFixed(2);
};
export const shaderSafeVector = (position) => {
    const formattedPositon = positionConfigToPosition(position);
    return `vec3(${shaderSafeFloat(formattedPositon.x)}, ${shaderSafeFloat(formattedPositon.y)}, ${shaderSafeFloat(formattedPositon.z)})`;
};
export const shaderSafeVector4 = (position, fourthElement = 1) => {
    const formattedPositon = positionConfigToPosition(position);
    return `vec4(${shaderSafeFloat(formattedPositon.x)}, ${shaderSafeFloat(formattedPositon.y)}, ${shaderSafeFloat(formattedPositon.z)}, ${isVariableName(fourthElement)
        ? fourthElement
        : shaderSafeFloat(Number(fourthElement))})`;
};
const isVariableName = (value) => Number.isNaN(Number(value));
