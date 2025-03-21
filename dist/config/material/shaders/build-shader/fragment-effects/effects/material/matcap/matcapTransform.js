"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matcapTransform = void 0;
const fragmentEffects_consts_1 = require("../../../fragmentEffects.consts");
const matcapTransform = (_matcapEffectProps) => {
    const matcapType = "MESH";
    const { transform } = getEffectData(matcapType);
    return { transform };
};
exports.matcapTransform = matcapTransform;
const getEffectData = (matcapType) => {
    switch (matcapType) {
        case "TEXTURED_POINT":
            return {
                transform: `  vec4 matcapColor = texture2D(uMaterial, gl_PointCoord);
        ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = vec4( matcapColor.rgb, 0.0);`,
            };
        case "POINT":
            return {
                transform: `  vec3 eyeDirection = normalize(vEye);
                      vec3 normal= calculateNormal(vPosition);
                      vec3 reflection = reflect(eyeDirection, vPosition);
                      float m = 20.8284271247461903 * sqrt(reflection.z + 1.0);
                      vec2 matcapUV = reflection.xy / m + 0.5;
                      vec4 matcapColor = texture2D(uMaterial, matcapUV );
                      ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = vec4( matcapColor.rgb, 1.0);`,
            };
        case "MESH":
        default:
            return {
                transform: `
          vec3 newNormal = calculateNormal(vPosition);
          vec3 x = normalize( vec3( vEye.z, 0.0, - vEye.x ) );
          vec3 y = cross( vEye, x );
          vec2 uv = vec2( dot( x, newNormal ), dot( y, newNormal ) ) * 0.495 + 0.5;
          vec4 matcapColor = texture2D(uMaterial, uv);
          ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = vec4( matcapColor.rgb, 1.0);`,
            };
    }
};
