"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorTransformation = void 0;
const createColorVectorString_1 = require("../../../helpers/createColorVectorString");
const fragmentEffects_consts_1 = require("../../fragmentEffects.consts");
const colorTransformation = (effectProps) => {
    const colorAsVector = (0, createColorVectorString_1.createColorVectorString)(effectProps.color, !!effectProps.opacity);
    return `
       ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = ${colorAsVector};
        `;
};
exports.colorTransformation = colorTransformation;
