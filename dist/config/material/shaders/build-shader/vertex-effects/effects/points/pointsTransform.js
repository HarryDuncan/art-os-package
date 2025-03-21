"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointsTransform = void 0;
const shaderConversions_1 = require("../../../../../../../utils/conversion/shaderConversions");
const vertexEffects_consts_1 = require("../../vertexEffects.consts");
const pointsPerspective_1 = require("./pointsPerspective");
const pointsTransform = (effectProps) => {
    const { pointSize, perspectiveConfig } = effectProps;
    const perspective = (0, pointsPerspective_1.pointsPerspective)(vertexEffects_consts_1.VERTEX_POINT_NAME, perspectiveConfig);
    const transformation = `gl_PointSize = ${perspective.length ? perspective : (0, shaderConversions_1.shaderSafeFloat)(pointSize)};`;
    return transformation;
};
exports.pointsTransform = pointsTransform;
