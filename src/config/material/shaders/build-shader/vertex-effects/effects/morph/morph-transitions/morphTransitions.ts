import { TransitionConfig } from "../../../vertexShader.types";
import { noiseTransition } from "./noise-transition/noiseTransition";

export const morphTransitions = (transitionConfig: TransitionConfig) => {
  const {
    requiredFunctions,
    uniformConfig,
    attributeConfig,
    transformation,
    varyingConfig,
  } = noiseTransition(transitionConfig);

  return {
    requiredFunctions,
    uniformConfig,
    attributeConfig,
    transformation,
    varyingConfig,
  };
};
