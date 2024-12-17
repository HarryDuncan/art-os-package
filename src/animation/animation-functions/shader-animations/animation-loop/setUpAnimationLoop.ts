import { ShaderMeshObject } from "../../../../config/mesh/mesh.types";
import { getLoopType } from "./loops/getLoopTypes";
import { updateObjectUniformByKey } from "../uniforms/updateObjectUniformByKey";
import { AnimationLoopConfigItem } from "./animationloop.types";
import { composeFunctions } from "../../../../utils/composeFunctions";
// import { transitionLoop } from "./transition-loop/transitionLoop";

const defaultConfig = [
  {
    uniform: "uTime",
    loopType: "LINEAR",
  },
];
export const setUpAnimationLoop = (
  config: AnimationLoopConfigItem[],

  loopDuration: number
): ((
  shaderMesh: ShaderMeshObject,
  time: number
) => [shaderMesh: ShaderMeshObject, time: number]) => {
  const animationConfig = [
    ...defaultConfig,
    ...config,
  ] as AnimationLoopConfigItem[];
  const animationLoopFunctions = animationConfig.map(
    ({
      uniform,
      toMaterial,
      loopType,
      duration,
      loopProps,
      uniformArrayIndex,
    }) => {
      const animationLoopDuration = duration ?? loopDuration;
      const loopFunction = getLoopType(
        loopType,
        animationLoopDuration,
        loopProps
      );
      return (shaderMesh: ShaderMeshObject, time: number) => {
        if (toMaterial && shaderMesh?.material.name !== toMaterial) {
          return [shaderMesh, time];
        }
        const uniformValue = loopFunction(time);
        updateObjectUniformByKey(
          shaderMesh,
          uniform,
          uniformValue,
          uniformArrayIndex
        );
        return [shaderMesh, time];
      };
    }
  );
  // const transitionAnimationFunction = transitionLoop(
  //   transitionAnimations ?? null
  // );
  // if (transitionAnimationFunction) {
  //   animationLoopFunctions.push(transitionAnimationFunction);
  // }
  return composeFunctions(animationLoopFunctions);
};
