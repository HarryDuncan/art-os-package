import { PointTexture } from "../../../../../../../../../types/materials/shaders/fragmentShader.types";
import { createColorVectorString } from "../../../../../helpers/createColorVectorString";
import { FRAG_COLOR_NAME } from "../../../../../../../../../consts";

export const getPointTexture = (
  pointTextures: PointTexture[],
  effectMaterial?: string
) => {
  const increment = 1 / pointTextures.length;
  return pointTextures
    .map(({ id, pointColor }, index) => {
      const lowerBound = (index * increment).toFixed(1);
      const upperBound = ((index + 1) * increment).toFixed(1);
      return `if(vPointType > ${lowerBound} && vPointType < ${
        upperBound === "1.0" ? "1.1" : upperBound
      }){
              vec4 textureColor =  texture2D(${id}, gl_PointCoord);
           
              ${FRAG_COLOR_NAME} = ${formatPointColor(
        pointColor,
        effectMaterial
      )} * textureColor ;
      
          } \n `;
    })
    .join(" \n ");
};

const formatPointColor = (pointColor: string, effectMaterial?: string) => {
  if (effectMaterial) {
    return `vec4(${effectMaterial}.rgb, opacity)`;
  }
  return `${createColorVectorString(pointColor, true)}`;
};
