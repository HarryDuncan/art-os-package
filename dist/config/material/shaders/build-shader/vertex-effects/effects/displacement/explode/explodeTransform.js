import { VERTEX_POINT_NAME } from "../../../vertexEffects.consts";
export const explodeTransform = (explodeParameters) => {
    const { effectDistanceMinLength, effectStrength } = explodeParameters;
    return `
      // EXPLODE POINTS
      vec3 displacedPosition = vec3( ${VERTEX_POINT_NAME}.xy, 0);
      vec3 effect = vec3(ndcPosition.xy, 0);
      vec3 effectDistanceVector =  effect - displacedPosition;
      float effectDistanceLength = length(effectDistanceVector);
      float effectStrength =  ${effectStrength} * uStrength;
      if(effectDistanceLength <=  ${effectDistanceMinLength} * uStrength){
        float effectDirection =  signDirection;
        if(effectDirection == 0.0){
          effectDirection = -1.0; 
        }
        float rand = random(uTime);
        ${VERTEX_POINT_NAME}.x += cos(randomAngle * rand) * effectStrength * effectDirection;
        ${VERTEX_POINT_NAME}.y += sin(randomAngle * rand) * effectStrength * effectDirection;
        isAffected = 1.0;
    }
    `;
};
