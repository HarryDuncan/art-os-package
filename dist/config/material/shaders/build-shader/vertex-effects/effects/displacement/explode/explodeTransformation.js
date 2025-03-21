"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explodeTransformation = void 0;
const explodeTransformation = (transformPointName, pointName) => {
    return `
    // EXPLODE AT POSITION
    vec3 ${pointName} = ${transformPointName};
    if(uPosition.x > -2000.0){
      vec3 effectPosition = uPosition;
      vec3 effectDistanceVector =  effectPosition - ${transformPointName};
      float effectDistanceLength = length(effectDistanceVector);
      float effectStrength =  1.5 * uPower;
      if(effectDistanceLength <= 1.25 * uPower){
        float rand = random(uTime);
        ${pointName}.x += cos(angle) * effectStrength;
        ${pointName}.y += sin(angle) * effectStrength;
        vAffected = 1.0;
      }
    }`;
};
exports.explodeTransformation = explodeTransformation;
