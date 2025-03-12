import { FragmentEffectData } from "../../../types";
import { EMPTY_UNIFORM_CONFIG } from "../../../shader-properties/uniforms/uniforms.consts";

export const defaultFragmentEffect = (
  declareInTransform = true
): FragmentEffectData => {
  const uniformConfig = { ...EMPTY_UNIFORM_CONFIG };
  const defaultFrag = ``;
  return {
    requiredFunctions: [],
    uniformConfig,
    transformation: declareInTransform ? defaultFrag : ``,
    varyingConfig: [],
    attributeConfig: [],
  };
};
