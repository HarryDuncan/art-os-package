import { hexToRgb } from "../../../../../../utils/conversion/hexToRgb";
import { arrayToVector } from "../../../../../../utils/conversion/conversion";
export const formatParsedUniformConfigs = (uniformConfig) => {
    var _a;
    const formattedCustomConfigs = (_a = uniformConfig.customUniforms) === null || _a === void 0 ? void 0 : _a.map((uniform) => {
        if (uniform.id.indexOf("Color") !== -1 && uniform.value !== undefined) {
            const colorValue = hexToRgb(uniform.value);
            if (colorValue) {
                return Object.assign(Object.assign({}, uniform), { value: arrayToVector(colorValue) });
            }
        }
        return Object.assign({}, uniform);
    });
    return Object.assign(Object.assign({}, uniformConfig), { customUniforms: formattedCustomConfigs });
};
