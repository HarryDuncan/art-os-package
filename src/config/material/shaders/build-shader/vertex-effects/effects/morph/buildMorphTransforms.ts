import { VERTEX_POINT_NAME } from "../../vertexEffects.consts";
import { MorphObject } from "../../vertexEffects.types";

export const buildMorphTransforms = (morphObjects: MorphObject[]) => {
  return morphObjects
    .map(({ pointName, normalName }, index) => {
      const targetMorphIndex = index + 1;
      return ` 
        if(uLoopCount == ${targetMorphIndex}){
            currentPosition = ${pointName};
            currentNormal = ${normalName};
            ${
              targetMorphIndex > morphObjects.length - 1
                ? `effect_direction = ${VERTEX_POINT_NAME}.xyz - currentPosition;
            normal_effect_direction = normal - currentNormal.xyz;`
                : `effect_direction = ${morphObjects[targetMorphIndex].pointName} - currentPosition;
            normal_effect_direction = ${morphObjects[targetMorphIndex].normalName} - currentNormal;`
            }
            
        } \n `;
    })
    .join(" \n ");
};
