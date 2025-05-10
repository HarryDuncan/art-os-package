import { getPointTexture } from "./point-material-functions/getPointTextures";
import {
  TransformationConfig,
  UniformValueConfig,
} from "../../../../buildShader.types";
import {
  FragmentEffectType,
  PointMaterialFragmentEffectProps,
} from "../../../fragmentShader.types";
import { generateVertexTransformation } from "../../../../helpers/generateTransform";

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

export const pointMaterialTransform = (
  effectType: FragmentEffectType,
  pointEffectProps: PointMaterialFragmentEffectProps,
  configuredUniforms: UniformValueConfig[]
) => {
  const { isTextured } = pointEffectProps;

  const pointColor = getPointColorTransform(
    effectType,
    configuredUniforms,
    pointEffectProps
  );
  const textureTransform = isTextured
    ? "getPointTexture(configuredUniforms)"
    : "";
  const updatedEffectCode = [
    ...pointMaterialTransformConfig.effectCode,
    pointColor,
    textureTransform,
  ];
  pointMaterialTransformConfig.effectCode = updatedEffectCode;
  const transformation = generateVertexTransformation(
    pointMaterialTransformConfig,
    configuredUniforms
  );
  return transformation;
};

const getPointColorTransform = (
  effectType: FragmentEffectType,
  configuredUniforms: UniformValueConfig[],
  pointEffectProps: PointMaterialFragmentEffectProps
) => {
  return "";
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
