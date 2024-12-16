import { MaterialEffectProps } from "../../../../types";

export const matcapTransform = (
  fragName: string,
  _previousFragName: string,
  _matcapEffectProps: MaterialEffectProps
) => {
  const matcapType = "MESH";
  const { transform } = getEffectData(fragName, matcapType);

  return { transform };
};

const getEffectData = (fragName: string, matcapType: string) => {
  switch (matcapType) {
    case "TEXTURED_POINT":
      return {
        transform: `  vec4 matcapColor = texture2D(uMaterial, gl_PointCoord);
        vec4 ${fragName} = vec4( matcapColor.rgb, 0.0);`,
      };
    case "POINT":
      return {
        transform: `  vec3 eyeDirection = normalize(vEye);
                      vec3 normal= calculateNormal(vPosition);
                      vec3 reflection = reflect(eyeDirection, vPosition);
                      float m = 20.8284271247461903 * sqrt(reflection.z + 1.0);
                      vec2 matcapUV = reflection.xy / m + 0.5;
                      vec4 matcapColor = texture2D(uMaterial, matcapUV );
                    vec4 ${fragName} = vec4( matcapColor.rgb, 1.0);`,
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
          vec4 ${fragName} = vec4( matcapColor.rgb, 1.0);`,
      };
  }
};
