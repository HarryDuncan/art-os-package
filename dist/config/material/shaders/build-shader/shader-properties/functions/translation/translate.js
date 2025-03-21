"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vertexTranslate = void 0;
exports.vertexTranslate = `
vec3 translateVertex(vec3 translationVector, vec3 inPosition){
    return inPosition + translationVector;
}`;
