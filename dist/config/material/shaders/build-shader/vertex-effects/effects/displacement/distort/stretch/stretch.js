"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stretch = void 0;
const three_1 = require("three");
const constants_1 = require("../../../../../constants");
const vectorCalculations_1 = require("../../../../../shader-properties/functions/maths/vectorCalculations");
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
const stretch = (_effectProps) => {
    const uniformConfig = {
        defaultUniforms: [],
        customUniforms: [
            {
                id: "uStretchStrength",
                valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
                arrayValue: 0.0,
            },
            {
                id: "uCenter",
                valueType: constants_1.ShaderPropertyValueTypes.VEC3,
                value: new three_1.Vector3(0, 0, 0),
            },
        ],
    };
    const requiredFunctions = [
        { id: "scaleVector3", functionDefinition: vectorCalculations_1.scaleVector3 },
    ];
    const transformation = `
    vec4 p = vec4(${vertexEffects_consts_1.VERTEX_POINT_NAME}, 1.0);
    vec4 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = p;
    vec3 stretchPoint1 = scaleVector3(-7.0, uStretchStrength);
    vec3 stretchPoint2 = scaleVector3(7.0, uStretchStrength);
    // get the distance from position to uStrechPoints 1 and 2
    vec3 center = vec3(0.0,0.0,0.0);

    // Calculate distance from the vertex position to the center and stretch points
    float distFromCenter = distance(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, center);
    float distFromStretch1 = distance(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, stretchPoint1);
    float distFromStretch2 = distance(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, stretchPoint2);

    vec3 selectedPosition = distFromStretch1 < distFromStretch2 ? stretchPoint1 : stretchPoint2;
    float minStretchDistance = min(distFromStretch1, distFromStretch2);

    // Linearly interpolate stretch factor based on the distance
    float stretchFactor = mix(1.0, 2.0, minStretchDistance / distFromCenter);
    
 
    // Apply the stretch transformation
    vec3 stretchedPosition = mix(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, selectedPosition,  1.0 / stretchFactor);

    // Assign the transformed position
    ${vertexEffects_consts_1.VERTEX_POINT_NAME} = vec4(stretchedPosition, 1.0);
    vec4 twistedNormal = vec4( normal, 1.0 );`;
    return {
        transformation,
        uniformConfig,
        VERTEX_POINT_NAME: vertexEffects_consts_1.VERTEX_POINT_NAME,
        requiredFunctions,
    };
};
exports.stretch = stretch;
