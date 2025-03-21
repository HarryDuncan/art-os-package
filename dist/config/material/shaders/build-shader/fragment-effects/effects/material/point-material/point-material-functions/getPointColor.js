"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPointColor = void 0;
const fragmentEffects_consts_1 = require("../../../../fragmentEffects.consts");
const createColorVectorString_1 = require("../../../../../helpers/createColorVectorString");
const getPointColor = (defaultColor) => {
    const defaultColorVector = (0, createColorVectorString_1.createColorVectorString)(defaultColor !== null && defaultColor !== void 0 ? defaultColor : fragmentEffects_consts_1.DEFAULT_FRAG_COLOR, true);
    return `${fragmentEffects_consts_1.FRAG_COLOR_NAME} =  ${defaultColorVector};`;
};
exports.getPointColor = getPointColor;
