import { MorphObject } from "../../vertexEffects.types";

export const buildMorphTransforms = (
  morphObjects: MorphObject[],
  previousPointName: string
) => {
  return morphObjects
    .map(({ pointName, normalName }, index) => {
      const targetMorphIndex = index + 1;
      return ` 
        if(uLoopCount == ${targetMorphIndex}){
            currentPosition = ${pointName};
            currentNormal = ${normalName};
            ${
              targetMorphIndex > morphObjects.length - 1
                ? `effect_direction = ${previousPointName}.xyz - currentPosition;
            normal_effect_direction = normal - currentNormal;`
                : `effect_direction = ${morphObjects[targetMorphIndex].pointName} - currentPosition;
            normal_effect_direction = ${morphObjects[targetMorphIndex].normalName} - currentNormal;`
            }
            
        } \n `;
    })
    .join(" \n ");
};
