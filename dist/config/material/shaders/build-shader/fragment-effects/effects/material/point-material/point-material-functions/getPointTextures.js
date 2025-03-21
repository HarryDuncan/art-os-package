"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPointTexture = void 0;
const createColorVectorString_1 = require("../../../../../helpers/createColorVectorString");
const fragmentEffects_consts_1 = require("../../../../fragmentEffects.consts");
const getPointTexture = (pointTextures, effectMaterial) => {
    const increment = 1 / pointTextures.length;
    return pointTextures
        .map(({ id, pointColor }, index) => {
        const lowerBound = (index * increment).toFixed(1);
        const upperBound = ((index + 1) * increment).toFixed(1);
        return `if(vPointType > ${lowerBound} && vPointType < ${upperBound === "1.0" ? "1.1" : upperBound}){
              vec4 textureColor =  texture2D(${id}, gl_PointCoord);
           
              ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = ${formatPointColor(pointColor, effectMaterial)} * textureColor ;
      
          } \n `;
    })
        .join(" \n ");
};
exports.getPointTexture = getPointTexture;
const formatPointColor = (pointColor, effectMaterial) => {
    if (effectMaterial) {
        return `vec4(${effectMaterial}.rgb, opacity)`;
    }
    return `${(0, createColorVectorString_1.createColorVectorString)(pointColor, true)}`;
};
