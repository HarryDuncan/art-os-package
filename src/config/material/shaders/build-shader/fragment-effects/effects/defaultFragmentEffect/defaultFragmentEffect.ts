import { FragmentEffectData } from "../../../types";
import { EMPTY_UNIFORM_CONFIG } from "../../../shader-properties/uniforms/uniforms.consts";
import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";

export const defaultFragmentEffect = (
  fragName: string = FRAGMENT_COLOR_NAMES.DEFAULT,
  declareInTransform = true
): FragmentEffectData => {
  const uniformConfig = { ...EMPTY_UNIFORM_CONFIG };
  const defaultFrag = `vec4 ${fragName} = vec4(1.0,0,0,1.0);`;
  return {
    requiredFunctions: [],
    uniformConfig,
    transformation: declareInTransform ? defaultFrag : ``,
    varyingConfig: [],
    attributeConfig: [],
    fragName,
    fragmentColorInstantiation: defaultFrag,
  };
};
