"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMorphTransforms = void 0;
const vertexEffects_consts_1 = require("../../vertexEffects.consts");
const buildMorphTransforms = (morphObjects) => {
    return morphObjects
        .map(({ pointName, normalName }, index) => {
        const targetMorphIndex = index + 1;
        return ` 
        if(uLoopCount == ${targetMorphIndex}){
            currentPosition = ${pointName};
            currentNormal = ${normalName};
            ${targetMorphIndex > morphObjects.length - 1
            ? `effect_direction = ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz - currentPosition;
            normal_effect_direction = normal - currentNormal.xyz;`
            : `effect_direction = ${morphObjects[targetMorphIndex].pointName} - currentPosition;
            normal_effect_direction = ${morphObjects[targetMorphIndex].normalName} - currentNormal;`}
            
        } \n `;
    })
        .join(" \n ");
};
exports.buildMorphTransforms = buildMorphTransforms;
