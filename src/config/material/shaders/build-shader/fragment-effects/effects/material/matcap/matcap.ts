import {
  DEFAULT_MATCAP_EFFECT_PROPS,
  DEFAULT_MATCAP_UNIFORMS,
  MATCAP_REQUIRED_FUNCTIONS,
  MATCAP_VARYINGS,
} from "./matcap.consts";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { matcapTransform } from "./matcapTransform";
import {
  MaterialEffectProps,
  FragmentEffectData,
} from "../../../../../../../../types/materials/shaders/fragmentShader.types";

export const matcapMaterial = (
  effectProps: Partial<MaterialEffectProps> = {}
): FragmentEffectData => {
  const formattedProps = formatFragmentParameters(
    effectProps,
    DEFAULT_MATCAP_EFFECT_PROPS
  ) as MaterialEffectProps;

  const { transform } = matcapTransform(formattedProps);
  const uniformConfig = DEFAULT_MATCAP_UNIFORMS;
  const varyingConfig = MATCAP_VARYINGS;
  const requiredFunctions = MATCAP_REQUIRED_FUNCTIONS;

  return {
    requiredFunctions,
    uniformConfig,
    transformation: transform,
    varyingConfig,
    attributeConfig: [],
  };
};
