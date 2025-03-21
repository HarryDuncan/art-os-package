import { FRAG_COLOR_NAME } from "../../../fragmentEffects.consts";
export const phongTransform = () => {
    const transformation = `
  vec3 N = normalize(vNormalInterpolation);
  vec3 L = normalize(uLightPosition - vPosition);

  // Lambert's cosine law
  float lambertian = max(dot(N, L), 0.0);
  float specular = 0.0;
  if(lambertian > 0.0) {
    vec3 R = normalize(reflect(-L, N));      // Reflected light vector
    vec3 V = normalize(cameraPosition   - vPosition );// Vector to viewer
    // Compute the specular term
    float specAngle = max(dot(R, V), 0.0);
    specular = pow(specAngle, uShininess);
  }
  ${FRAG_COLOR_NAME} = vec4(uAmbientReflection * uAmbientColor +
                      uDiffuseReflection * lambertian * uDiffuseColor +
                      uSpecularReflection * specular * uSpecularColor, 1.0);

    `;
    return { transformation };
};
