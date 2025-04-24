import { AttributeConfig } from "../../../../../../../../../types/materials/shaders/buildShader.types";
import { ImageAsMaskEffectProps } from "../../../../../../../../../types/materials/shaders/vertexShader.types";
import { SHADER_PROPERTY_VALUE_TYPES } from "../../../../../../../../../consts/materials/shader.consts";
import { createColorVectorString } from "../../../../../helpers/createColorVectorString";
import {
  rand,
  random,
} from "../../../../../shader-properties/functions/maths/maths";
import { noise } from "../../../../../shader-properties/functions/noise/noise";
import { EMPTY_UNIFORM_CONFIG } from "../../../../../shader-properties/uniforms/uniforms.consts";
import { VARYING_TYPES } from "../../../../../shader-properties/varyings/varyings.consts";
import { VERTEX_POINT_NAME } from "../../../../../../../../../consts/materials/vertexEffects.consts";

export const imageAsMaskTransform = (
  imageVertexEffectProps: ImageAsMaskEffectProps
) => {
  const { removedColors, overlayTexture } = imageVertexEffectProps;

  const effectUniforms = EMPTY_UNIFORM_CONFIG;
  const effectVaryings = [
    {
      id: "vUv",
      varyingType: VARYING_TYPES.ATTRIBUTE,
      attributeKey: "uv",
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    },
    {
      id: "vPUv",
      varyingType: VARYING_TYPES.CUSTOM,
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC2,
    },
    {
      id: "vPixelColor",
      varyingType: VARYING_TYPES.CUSTOM,
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
      value: `colA`,
    },
    {
      id: "vHidePixel",
      varyingType: VARYING_TYPES.CUSTOM,
      valueType: SHADER_PROPERTY_VALUE_TYPES.FLOAT,
      value: "pixelMask",
    },
  ];
  if (overlayTexture) {
    effectVaryings.push({
      id: "vOverlayPixelColor",
      varyingType: VARYING_TYPES.CUSTOM,
      valueType: SHADER_PROPERTY_VALUE_TYPES.VEC4,
      value: `overlayColor`,
    });
  }
  const effectFunctions = [
    { id: "rand", functionDefinition: rand },
    { id: "noise", functionDefinition: noise },
    { id: "random", functionDefinition: random },
  ];
  const effectAttributes = [] as AttributeConfig[];

  const transformation = `
 
      vUv = uv;
      // particle uv
      vec2 puv = position.xy / uTextureSize;
      vPUv = puv;

      // pixel color
      vec4 colA = texture2D(uTexture, puv);
      ${getRemovedColors(removedColors, "colA")}
      float grey = colA.r * 0.2 + colA.g * 0.71 + colA.b * 0.07;
      vec3 displaced = pointOffset;
      // randomise
      displaced.xy += vec2(random(pointIndex) - 0.5, random(pointOffset.x + pointIndex) - 0.5) * uRandom;
      float rndz = (random(pointIndex) + noise(vec2(pointIndex * 0.1, uTime * 0.1)));
      displaced.z += rndz * (random(pointIndex) * 2.0 * uDepth);
      // center
      displaced.xy -= uTextureSize * 0.5;
      // particle size
      float psize = (noise(vec2(uTime, pointIndex) * 0.5) + 2.0);
      float siz = 0.0;
      if( grey < 0.9 )
      {
          siz = 12.4 ;
      };
      ${VERTEX_POINT_NAME} =  vec4(displaced, 1.0);
      psize *= min(grey, siz);
      psize *= uSize;
       gl_PointSize = psize;

       ${
         overlayTexture &&
         `vec4 overlayColor = texture2D(${overlayTexture}, puv);`
       }

      

`;
  return {
    transformation,
    effectUniforms,
    effectVaryings,

    effectFunctions,
    effectAttributes,
  };
};

const getRemovedColors = (colorStrings: string[], texturePixelName: string) => {
  const colorComparisons = colorStrings.map((color, index) => {
    const colorName = `maskedColor_${index}`;
    return `
          vec4 ${colorName} = ${createColorVectorString(color)};
          pixelMask = min(distance(${colorName}, ${texturePixelName}), pixelMask);
          `;
  });

  return `
    float pixelMask = 1.0;
    ${colorComparisons}
    `;
};
