"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vertexFilterTransformation = void 0;
const vertexEffects_consts_1 = require("../../vertexEffects.consts");
const vertexFilterTransformation = () => {
    return `
// FILTER
if(mod(pointIndex, uReduced) == 0.0){
    vec3 translated =  inverseRotate(${vertexEffects_consts_1.VERTEX_POINT_NAME});
    gl_PointSize = max(8.0, min(18.0, 18.0 *  (9.0 / translated.z)) );
  }else{
    gl_PointSize = 0.0;
  }
  if(vAffected == 1.0){
    gl_PointSize = 64.0;
  }
  vec3 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = ${vertexEffects_consts_1.VERTEX_POINT_NAME};
`;
};
exports.vertexFilterTransformation = vertexFilterTransformation;
