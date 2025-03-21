"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffuseFactor = void 0;
exports.diffuseFactor = `
/*
*  Calculates the diffuse factor produced by the light illumination
*/
float diffuseFactor(vec3 normal, vec3 light_direction) {
    float df = dot(normalize(normal), normalize(light_direction));

    if (gl_FrontFacing) {
        df = -df;
    }

    return max(0.0, df);
}`;
