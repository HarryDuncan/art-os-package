"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanishTransform = void 0;
const shaderConversions_1 = require("../../../../../../../utils/conversion/shaderConversions");
const fragmentEffects_consts_1 = require("../../fragmentEffects.consts");
const vanishTransform = (vanishParameters) => {
    const { numberOfRings, vanishHeight } = vanishParameters;
    const transformation = `

        // VANISH
     
        vec3 location = vec3(vPosition * uNoise * 32.0 + uTime);
        float pattern = simplePerlinNoise(location) * uDisplacement;
    
        float percent =  mod(uTime * 0.5, ${(0, shaderConversions_1.shaderSafeFloat)(vanishHeight)});
        float target = percent - ${(0, shaderConversions_1.shaderSafeFloat)(vanishHeight / 2)};
    
        float proximity = distance(vPosition.y * 0.7, target);
        float affected = clamp(0.23 * uSpread - proximity, 0.0, 1.0);
        vec3 distortion = pattern * vec3(affected);
    
        vec3 newPosition = vPosition + vNormal * distortion;
        float brightness = 100.0;
        if(length(distortion) > 0.05) {
            discard;
        }
        vec3 col = vec3(simplePerlinNoise(vec3(1.0 - newPosition.z * ${numberOfRings ? (0, shaderConversions_1.shaderSafeFloat)(numberOfRings) : "uNumberOfRings"})) * 0.0)  * ${fragmentEffects_consts_1.FRAG_COLOR_NAME}.xyz * brightness;
        ${fragmentEffects_consts_1.FRAG_COLOR_NAME}  = vec4(${fragmentEffects_consts_1.FRAG_COLOR_NAME}.xyz + clamp(col, vec3(0.0), vec3(1.0)), 1.0);
    
      `;
    return { transformation };
};
exports.vanishTransform = vanishTransform;
