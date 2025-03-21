import { getLoopType } from "./loops/getLoopTypes";
import { updateObjectUniformByKey } from "../uniforms/updateObjectUniformByKey";
import { composeFunctions } from "../../../../utils/composeFunctions";
// import { transitionLoop } from "./transition-loop/transitionLoop";
const defaultConfig = [
    {
        uniform: "uTime",
        loopType: "LINEAR",
    },
];
export const setUpAnimationLoop = (config, loopDuration) => {
    const animationConfig = [
        ...defaultConfig,
        ...config,
    ];
    const animationLoopFunctions = animationConfig.map(({ uniform, toMaterial, loopType, duration, loopProps, uniformArrayIndex, }) => {
        const animationLoopDuration = duration !== null && duration !== void 0 ? duration : loopDuration;
        const loopFunction = getLoopType(loopType, animationLoopDuration, loopProps);
        return (shaderMesh, time) => {
            if (toMaterial && (shaderMesh === null || shaderMesh === void 0 ? void 0 : shaderMesh.material.name) !== toMaterial) {
                return [shaderMesh, time];
            }
            const uniformValue = loopFunction(time);
            updateObjectUniformByKey(shaderMesh, uniform, uniformValue, uniformArrayIndex);
            return [shaderMesh, time];
        };
    });
    // const transitionAnimationFunction = transitionLoop(
    //   transitionAnimations ?? null
    // );
    // if (transitionAnimationFunction) {
    //   animationLoopFunctions.push(transitionAnimationFunction);
    // }
    return composeFunctions(animationLoopFunctions);
};
