"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageToPointsTransform = void 0;
const constants_1 = require("../../../../../constants");
const maths_1 = require("../../../../../shader-properties/functions/maths/maths");
const noise_1 = require("../../../../../shader-properties/functions/noise/noise");
const uniforms_consts_1 = require("../../../../../shader-properties/uniforms/uniforms.consts");
const varyings_consts_1 = require("../../../../../shader-properties/varyings/varyings.consts");
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
const imageToPointsTransform = (_imageVertexEffectProps) => {
    const effectUniforms = uniforms_consts_1.EMPTY_UNIFORM_CONFIG;
    const effectVaryings = [
        {
            id: "vUv",
            varyingType: varyings_consts_1.VARYING_TYPES.ATTRIBUTE,
            attributeKey: "uv",
            valueType: constants_1.ShaderPropertyValueTypes.VEC2,
        },
        {
            id: "vPUv",
            varyingType: varyings_consts_1.VARYING_TYPES.CUSTOM,
            valueType: constants_1.ShaderPropertyValueTypes.VEC2,
        },
        {
            id: "vPixelColor",
            varyingType: varyings_consts_1.VARYING_TYPES.CUSTOM,
            valueType: constants_1.ShaderPropertyValueTypes.VEC4,
            value: `colA`,
        },
    ];
    const effectFunctions = [
        { id: "rand", functionDefinition: maths_1.rand },
        { id: "noise", functionDefinition: noise_1.noise },
        { id: "random", functionDefinition: maths_1.random },
    ];
    const effectAttributes = [];
    const transformation = `
  
      vUv = uv;
      // particle uv
      vec2 puv = position.xy / uTextureSize;
      vPUv = puv;

      // pixel color
      vec4 colA = texture2D(uTexture, puv);

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
      ${vertexEffects_consts_1.VERTEX_POINT_NAME} =  vec4(displaced, 1.0);
      psize *= min(grey, siz);
      psize *= uSize;
       gl_PointSize = psize;

      

`;
    return {
        transformation,
        effectUniforms,
        effectVaryings,
        effectFunctions,
        effectAttributes,
    };
};
exports.imageToPointsTransform = imageToPointsTransform;
