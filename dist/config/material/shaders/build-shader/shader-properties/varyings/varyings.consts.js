"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_VARYINGS = exports.VARYING_TYPES = exports.V_CUSTOM_INSTANTIATION = exports.V_ATTRIBUTE_INSTANTIATION = exports.V_DEFAULT_INSTANTIATION = exports.V_DECLARATION = void 0;
const three_1 = require("three");
exports.V_DECLARATION = "// VARYING DECLARATION";
exports.V_DEFAULT_INSTANTIATION = "// DEFAULT VARYING INSTANTIATION";
exports.V_ATTRIBUTE_INSTANTIATION = "// ATTRIBUTE AS VARYING";
exports.V_CUSTOM_INSTANTIATION = "// CUSTOM VARYING";
exports.VARYING_TYPES = {
    DEFAULT: "DEFAULT",
    ATTRIBUTE: "ATTRIBUTE",
    CUSTOM: "CUSTOM",
};
exports.DEFAULT_VARYINGS = {
    vUv: {
        valueType: "vec2",
        defaultValue: new three_1.Vector2(1, 1),
    },
};
