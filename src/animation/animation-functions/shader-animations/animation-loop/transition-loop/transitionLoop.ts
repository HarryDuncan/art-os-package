import { ShaderMeshObject } from "../../../../../config/mesh/mesh.types";
import { getLoopType } from "../loops/getLoopTypes";
import { updateObjectUniformByKey } from "../../uniforms/updateObjectUniformByKey";
import { TransitionLoopConfig } from "../animationloop.types";

export const transitionLoop = (
  transitionConfig: TransitionLoopConfig | null
) => {
  if (!transitionConfig) return null;
  const { transitionAnimations, transitionDuration } = transitionConfig;
  const transitionLoopFunctions = transitionAnimations.map(
    ({ uniform, toMaterial, loopType, loopProps }) => {
      const loopFunction = getLoopType(loopType, transitionDuration, loopProps);
      return { toMaterial, uniform, loopFunction };
    }
  );

  return (shaderMesh: ShaderMeshObject, time: number) => {
    transitionLoopFunctions.forEach(({ loopFunction, uniform }) => {
      const uniformValue = loopFunction(time);
      updateObjectUniformByKey(shaderMesh, uniform, uniformValue);
    });
    return [shaderMesh, time];
  };
};
