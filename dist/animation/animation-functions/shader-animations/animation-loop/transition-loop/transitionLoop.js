import { getLoopType } from "../loops/getLoopTypes";
import { updateObjectUniformByKey } from "../../uniforms/updateObjectUniformByKey";
export const transitionLoop = (transitionConfig) => {
    if (!transitionConfig)
        return null;
    const { transitionAnimations, transitionDuration } = transitionConfig;
    const transitionLoopFunctions = transitionAnimations.map(({ uniform, toMaterial, loopType, loopProps }) => {
        const loopFunction = getLoopType(loopType, transitionDuration, loopProps);
        return { toMaterial, uniform, loopFunction };
    });
    return (shaderMesh, time) => {
        transitionLoopFunctions.forEach(({ loopFunction, uniform }) => {
            const uniformValue = loopFunction(time);
            updateObjectUniformByKey(shaderMesh, uniform, uniformValue);
        });
        return [shaderMesh, time];
    };
};
