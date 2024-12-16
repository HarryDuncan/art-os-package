import { ShaderPropertyValueTypes } from "../../../../constants";
import { fragmentEffectToEffectData } from "../../../../helpers/fragmentEffectToEffectData";
import { mergeUniformConfigs } from "../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import {
  FragmentEffectData,
  PointMaterialFragmentEffectProps,
  PointTexture,
} from "../../../../types";
import { matcapMaterial } from "../matcap/matcap";
import { phongMaterial } from "../phong-material/phong";
import { phongTransform } from "../phong-material/phongTransform";

import { getPointColor } from "./point-material-functions/getPointColor";
import { getPointTexture } from "./point-material-functions/getPointTextures";
import { textureAsPoints } from "./point-material-functions/textureAsPoints";

const setUpTextureUniforms = (pointTextures: PointTexture[]) =>
  pointTextures.map(({ id }) => ({
    id,
    valueType: ShaderPropertyValueTypes.SAMPLER2D,
  }));

export const pointMaterialTransform = (
  fragName: string,
  _previousFragName: string,
  pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const { pointTextures } = pointEffectProps;
  const defaultEffectUniforms = {
    defaultUniforms: [],
    customUniforms: setUpTextureUniforms(pointTextures),
  };

  const {
    effectTransform,
    effectFragName,
    effectAttributes,
    effectVaryings,
    effectRequiredFunctions,
    effectUniforms: returnedEffectUniforms,
  } = getEffectData(fragName, pointEffectProps);

  const transform = `
 float opacity = 1.0;
  ${effectTransform}
   if(vPointDisplay == 0.0 ){
      opacity = 0.0;
  }
 
  vec4 ${fragName};
  ${getPointTexture(fragName, pointTextures, effectFragName)}

  if(${fragName}.a < 0.5) discard;
  `;

  return {
    transform,
    effectFragName,
    effectAttributes,
    effectRequiredFunctions,
    effectVaryings,
    effectUniforms: mergeUniformConfigs([
      defaultEffectUniforms,
      returnedEffectUniforms,
    ]),
  };
};

const getEffectData = (
  fragName: string,
  pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const { effectProps, effectType } = pointEffectProps;

  switch (effectType) {
    case "MATCAP": {
      const matcap = matcapMaterial(fragName, effectProps);
      return fragmentEffectToEffectData(matcap);
    }
    case "TEXTURE": {
      const texture = textureAsPoints(fragName, effectProps);
      return fragmentEffectToEffectData(texture);
    }
    case "PHONG": {
      const shading = phongMaterial(fragName, effectProps);
      return fragmentEffectToEffectData(shading);
    }
    case "COLOR":
    default:
      return defaultPointMaterial(fragName, pointEffectProps);
  }
};

const defaultPointMaterial = (
  fragName: string,
  pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const { defaultColor } = pointEffectProps;
  const transformation = `${getPointColor(fragName, defaultColor)}`;
  return fragmentEffectToEffectData({
    transformation,
    fragName: `pointColor_${fragName}`,
  });
};
