import { FragmentEffectData } from "../../fragmentShader.types";
import { EMPTY_UNIFORM_CONFIG } from "../../../shader-properties/uniforms/uniforms.consts";

export const defaultFragmentEffect = (): FragmentEffectData => {
  const uniformConfig = { ...EMPTY_UNIFORM_CONFIG };
  const defaultFrag = ``;
  return {
    requiredFunctions: [],
    uniformConfig,
    transformation: defaultFrag,
    varyingConfig: [],
    attributeConfig: [],
  };
};
