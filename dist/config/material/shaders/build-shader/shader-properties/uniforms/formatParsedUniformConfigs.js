"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatParsedUniformConfigs = void 0;
const hexToRgb_1 = require("../../../../../../utils/conversion/hexToRgb");
const conversion_1 = require("../../../../../../utils/conversion/conversion");
const formatParsedUniformConfigs = (uniformConfig) => {
    var _a;
    const formattedCustomConfigs = (_a = uniformConfig.customUniforms) === null || _a === void 0 ? void 0 : _a.map((uniform) => {
        if (uniform.id.indexOf("Color") !== -1 && uniform.value !== undefined) {
            const colorValue = (0, hexToRgb_1.hexToRgb)(uniform.value);
            if (colorValue) {
                return Object.assign(Object.assign({}, uniform), { value: (0, conversion_1.arrayToVector)(colorValue) });
            }
        }
        return Object.assign({}, uniform);
    });
    return Object.assign(Object.assign({}, uniformConfig), { customUniforms: formattedCustomConfigs });
};
exports.formatParsedUniformConfigs = formatParsedUniformConfigs;
