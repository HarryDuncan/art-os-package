"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVaryings = void 0;
const buildShader_consts_1 = require("../../constants/buildShader.consts");
const createDeclarationString_1 = require("../../helpers/createDeclarationString");
const getDefaultValue_1 = require("../../helpers/getDefaultValue");
const varyings_consts_1 = require("./varyings.consts");
const vertexEffects_consts_1 = require("../../vertex-effects/vertexEffects.consts");
const buildVaryings = (varyingSchema, attributeConfig) => {
    const declaration = varyingDeclarations(varyingSchema);
    const instantiation = varyingInstantiation(varyingSchema, attributeConfig);
    return { declaration, instantiation };
};
exports.buildVaryings = buildVaryings;
const varyingDeclarations = (config) => {
    const declarationStrings = config.map(({ id, valueType }) => (0, createDeclarationString_1.createDeclarationString)(buildShader_consts_1.ShaderPropertyTypes.VARYING, valueType, id));
    const declaration = [varyings_consts_1.V_DECLARATION, ...declarationStrings].join(" \n ");
    return declaration;
};
const varyingInstantiation = (varyingConfig, attributeConfig) => {
    const defaultVaryingStrings = getDefaultVaryingString(varyingConfig);
    const attributeVaryingStrings = getAttributeVaryingStrings(varyingConfig, attributeConfig);
    const customVaryingsStrings = getCustomVaryingStrings(varyingConfig);
    return [
        ...defaultVaryingStrings,
        ...attributeVaryingStrings,
        ...customVaryingsStrings,
    ].join(" \n ");
};
const getDefaultVaryingString = (config) => {
    const defaultVaryings = config.filter((item) => item.varyingType === varyings_consts_1.VARYING_TYPES.DEFAULT);
    if (!defaultVaryings.length)
        return [];
    const strings = [varyings_consts_1.V_DEFAULT_INSTANTIATION];
    defaultVaryings.forEach((item) => {
        switch (item.id) {
            case "vUv":
                strings.push("vUv = uv;");
                break;
            case "vPosition":
                strings.push(`vPosition = ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz;`);
                break;
            case "vNormal":
                strings.push(`vNormal = ${vertexEffects_consts_1.VERTEX_NORMAL_NAME}.xyz;`);
                break;
            case "vModelViewMatrix":
                strings.push("vModelViewMatrix = modelViewMatrix;");
                break;
            case "vNormalInterpolation":
                strings.push(`vNormalInterpolation = normalize(normalMatrix  * ${vertexEffects_consts_1.VERTEX_NORMAL_NAME}.xyz);`);
                break;
            case "vTexCoord":
                strings.push(`vTexCoord = texcoord;`);
                break;
            case "vGeometryNormal":
                strings.push(`vGeometryNormal = ${vertexEffects_consts_1.VERTEX_NORMAL_NAME}.xyz`);
                break;
            case "vEye":
                strings.push(`vEye = normalize(vec3(modelViewMatrix * vec4(${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz, 1.0)));`);
                break;
            default:
                console.warn(`nothing made for default varying ${item.id}`);
        }
    });
    return strings;
};
const getCustomVaryingStrings = (config) => {
    const customVaryings = config.filter(({ varyingType }) => varyingType === varyings_consts_1.VARYING_TYPES.CUSTOM);
    if (!customVaryings.length)
        return [];
    const strings = [varyings_consts_1.V_CUSTOM_INSTANTIATION];
    customVaryings.forEach((item) => {
        var _a;
        strings.push(`${item.id} = ${(_a = item.value) !== null && _a !== void 0 ? _a : (0, getDefaultValue_1.getDefaultValueAsString)(item.valueType)};`);
    });
    return strings;
};
const getAttributeVaryingStrings = (config, attributeConfig = []) => config.flatMap(({ id, attributeKey, varyingType }) => {
    if (varyingType === varyings_consts_1.VARYING_TYPES.ATTRIBUTE) {
        const hasAttribute = attributeConfig.findIndex((attributeConf) => attributeConf.id === attributeKey);
        if (hasAttribute !== -1) {
            return `${id} = ${attributeKey};`;
        }
        console.warn(`varying ${id} links to ${attributeKey} but ${attributeKey} is not found`);
        return [];
    }
    return [];
});
