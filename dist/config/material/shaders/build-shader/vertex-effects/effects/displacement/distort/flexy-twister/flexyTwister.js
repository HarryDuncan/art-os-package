"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flexyTwister = void 0;
const constants_1 = require("../../../../../constants");
const distortion_1 = require("../../../../../shader-properties/functions/distortion/distortion");
const vertexEffects_consts_1 = require("../../../../vertexEffects.consts");
const flexyTwister = (_effectProps) => {
    const uniformConfig = {
        defaultUniforms: [],
        customUniforms: [
            {
                id: "uTwistRange",
                valueType: constants_1.ShaderPropertyValueTypes.FLOAT,
                value: 1.5,
            },
        ],
    };
    const requiredFunctions = [
        { id: "twister", functionDefinition: distortion_1.twisterDistortion },
    ];
    const transformation = `
     float howFarUp = position.y;

    float angle = sin(uTime) * uTwistRange;

    float twistAngle = angle * howFarUp;
    vec4 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = twister( vec4( position, 1.0 ), twistAngle );
    vec4 twistNormal = twister( vec4( normal, 1.0 ), twistAngle );
    vec4 twistedNormal = twister( vec4( normal, 1.0 ), twistAngle );`;
    return {
        transformation,
        uniformConfig,
        requiredFunctions,
    };
};
exports.flexyTwister = flexyTwister;
