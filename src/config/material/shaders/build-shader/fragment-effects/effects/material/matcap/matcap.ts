import { FragmentEffectData, MaterialEffectProps } from "../../../../types";
import { FRAGMENT_COLOR_NAMES } from "../../../fragmentEffects.consts";
import { generateUniqueFragName } from "../../../../helpers/generateUniqueFragName";
import {
  DEFAULT_MATCAP_EFFECT_PROPS,
  DEFAULT_MATCAP_UNIFORMS,
  MATCAP_REQUIRED_FUNCTIONS,
  MATCAP_VARYINGS,
} from "./matcap.consts";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { matcapTransform } from "./matcapTransform";

export const matcapMaterial = (
  previousFragName: string,
  effectProps: Partial<MaterialEffectProps> = {}
): FragmentEffectData => {
  const fragName = generateUniqueFragName(
    FRAGMENT_COLOR_NAMES.MATERIAL,
    effectProps.pointParent
  );

  const formattedProps = formatFragmentParameters(
    effectProps,
    DEFAULT_MATCAP_EFFECT_PROPS
  ) as MaterialEffectProps;

  const { transform } = matcapTransform(
    fragName,
    previousFragName,
    formattedProps
  );
  const uniformConfig = DEFAULT_MATCAP_UNIFORMS;
  const varyingConfig = MATCAP_VARYINGS;
  const requiredFunctions = MATCAP_REQUIRED_FUNCTIONS;

  return {
    requiredFunctions,
    uniformConfig,
    transformation: transform,
    varyingConfig,
    attributeConfig: [],
    fragName,
  };
};
