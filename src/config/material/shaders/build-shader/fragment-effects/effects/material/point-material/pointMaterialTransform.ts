import { getPointTexture } from "./point-material-functions/getPointTextures";
import {
  EffectParameters,
  TransformationConfig,
  UniformValueConfig,
} from "../../../../buildShader.types";
import { generateShaderTransformation } from "../../../../helpers/generateTransform";
import {
  FRAG_COLOR_NAME,
  FRAGMENT_EFFECT,
} from "../../../fragmentEffects.consts";
import { getTexturePixelColor } from "./point-material-functions/getTexturePixelColor";
import { getPointColor } from "./point-material-functions/getPointColor";
import { getOverlayPixelColor } from "./point-material-functions/getOverlayPixelColor";

const pointMaterialTransformConfig = {
  effectName: "pointMaterial",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: [
    `float opacity = 1.0;`,
    `if(vPointDisplay == 0.0 ){`,
    ` opacity = 0.0;`,
    `}`,
  ],
} as unknown as TransformationConfig;

const POINT_COLOR_EFFECT_FUNCTIONS = {
  [FRAGMENT_EFFECT.POINT_MATERIAL]: getPointColor,
  [FRAGMENT_EFFECT.POINT_MATERIAL_PIXEL_COLOR]: getTexturePixelColor,
  [FRAGMENT_EFFECT.POINT_MATERIAL_OVERLAY_COLOR]: getOverlayPixelColor,
  // [FRAGMENT_EFFECT.POINT_MATERIAL_MATCAP]: matcapMaterial,
  // [FRAGMENT_EFFECT.POINT_MATERIAL_PHONG]: phongMaterial,
};
export const pointMaterialTransform = (
  effectType: string,
  effectParameters: EffectParameters,
  configuredUniforms: UniformValueConfig[]
) => {
  const { isTextured } = effectParameters;

  const pointColor = getPointColorTransform(
    effectType,
    configuredUniforms,
    effectParameters
  );
  const textureTransform = isTextured
    ? getPointTexture(configuredUniforms)
    : [];
  const updatedEffectCode = [
    ...pointMaterialTransformConfig.effectCode,
    pointColor,
    ...textureTransform,
    `if(${FRAG_COLOR_NAME}.a < 0.5) discard;`,
  ];
  pointMaterialTransformConfig.effectCode = updatedEffectCode;
  const transformation = generateShaderTransformation(
    pointMaterialTransformConfig,
    configuredUniforms
  );
  return transformation;
};

const getPointColorTransform = (
  effectType: string,
  configuredUniforms: UniformValueConfig[],
  effectParameters: EffectParameters
) => {
  return POINT_COLOR_EFFECT_FUNCTIONS[effectType](
    configuredUniforms,
    effectParameters
  );
};
// const getEffectData = (pointEffectProps: PointMaterialFragmentEffectProps) => {
//   const { effectProps, effectType } = pointEffectProps;
//   const effectFunction = POINT_COLOR_EFFECT_FUNCTIONS[effectType];
//   if (effectFunction) {
//     return fragmentEffectToEffectData(
//       effectFunction(effectProps ?? pointEffectProps)
//     );
//   }
//   return defaultPointMaterial(pointEffectProps);
// };

// const defaultPointMaterial = (
//   pointEffectProps: PointMaterialFragmentEffectProps
// ) => {
//   const { defaultColor } = pointEffectProps;
//   const transformation = `${getPointColor(defaultColor)}`;
//   return fragmentEffectToEffectData({
//     transformation,
//   });
// };

// const POINT_COLOR_EFFECT_FUNCTIONS = {
//   COLOR: defaultPointMaterial,
//   PIXEL_COLOR: getTexturePixelColor,
//   OVERLAY_COLOR: getOverlayPixelColor,
//   MATCAP: matcapMaterial,
//   TEXTURE: textureAsPoints,
//   PHONG: phongMaterial,
// };
