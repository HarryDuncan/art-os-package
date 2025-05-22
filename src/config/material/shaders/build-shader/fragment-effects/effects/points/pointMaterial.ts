import { getPointTexture } from "./functions/getPointTextures";
import { TransformationConfig } from "../../../buildShader.types";
import { generateShaderTransformation } from "../../../helpers/generateTransform";
import { FRAG_COLOR_NAME } from "../../fragmentEffects.consts";
import { FragmentEffectProps } from "../../fragmentShader.types";

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

// const POINT_COLOR_EFFECT_FUNCTIONS = {
//   [FRAGMENT_EFFECT.POINT_MATERIAL]: getPointColor,
//   [FRAGMENT_EFFECT.TEXTURE_PIXEL_COLOR]: getTexturePixelColor,
//   [FRAGMENT_EFFECT.OVERLAY_COLOR]: getOverlayPixelColor,
//   // [FRAGMENT_EFFECT.POINT_MATERIAL_MATCAP]: matcapMaterial,
//   // [FRAGMENT_EFFECT.POINT_MATERIAL_PHONG]: phongMaterial,
// };
export const pointMaterial = (effectProps: FragmentEffectProps) => {
  const { effectUniforms } = effectProps;
  const textureTransform = getPointTexture(effectUniforms);
  const updatedEffectCode = [
    ...pointMaterialTransformConfig.effectCode,
    ...textureTransform,

    `if(vPointDisplay == 0.0 ){`,
    ` discard;`,
    `}`,
    `if(${FRAG_COLOR_NAME}.a < 0.5) discard;`,
  ];
  pointMaterialTransformConfig.effectCode = updatedEffectCode;
  const transformation = generateShaderTransformation(
    pointMaterialTransformConfig,
    effectUniforms
  );
  return { transformation };
};

// const getPointColorTransform = (
//   effectType: string,
//   configuredUniforms: UniformConfig[],
//   effectParameters: EffectParameters
// ) => {
//   return POINT_COLOR_EFFECT_FUNCTIONS[effectType](
//     configuredUniforms,
//     effectParameters
//   );
// };

// const POINT_COLOR_EFFECT_FUNCTIONS = {
//   COLOR: defaultPointMaterial,
//   PIXEL_COLOR: getTexturePixelColor,
//   OVERLAY_COLOR: getOverlayPixelColor,
//   MATCAP: matcapMaterial,
//   TEXTURE: textureAsPoints,
//   PHONG: phongMaterial,
// };
