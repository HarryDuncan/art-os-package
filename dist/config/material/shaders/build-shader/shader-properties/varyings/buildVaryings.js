import { ShaderPropertyTypes } from "../../constants/buildShader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";
import { getDefaultValueAsString } from "../../helpers/getDefaultValue";
import { VARYING_TYPES, V_CUSTOM_INSTANTIATION, V_DECLARATION, V_DEFAULT_INSTANTIATION, } from "./varyings.consts";
import { VERTEX_NORMAL_NAME, VERTEX_POINT_NAME, } from "../../vertex-effects/vertexEffects.consts";
export const buildVaryings = (varyingSchema, attributeConfig) => {
    const declaration = varyingDeclarations(varyingSchema);
    const instantiation = varyingInstantiation(varyingSchema, attributeConfig);
    return { declaration, instantiation };
};
const varyingDeclarations = (config) => {
    const declarationStrings = config.map(({ id, valueType }) => createDeclarationString(ShaderPropertyTypes.VARYING, valueType, id));
    const declaration = [V_DECLARATION, ...declarationStrings].join(" \n ");
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
    const defaultVaryings = config.filter((item) => item.varyingType === VARYING_TYPES.DEFAULT);
    if (!defaultVaryings.length)
        return [];
    const strings = [V_DEFAULT_INSTANTIATION];
    defaultVaryings.forEach((item) => {
        switch (item.id) {
            case "vUv":
                strings.push("vUv = uv;");
                break;
            case "vPosition":
                strings.push(`vPosition = ${VERTEX_POINT_NAME}.xyz;`);
                break;
            case "vNormal":
                strings.push(`vNormal = ${VERTEX_NORMAL_NAME}.xyz;`);
                break;
            case "vModelViewMatrix":
                strings.push("vModelViewMatrix = modelViewMatrix;");
                break;
            case "vNormalInterpolation":
                strings.push(`vNormalInterpolation = normalize(normalMatrix  * ${VERTEX_NORMAL_NAME}.xyz);`);
                break;
            case "vTexCoord":
                strings.push(`vTexCoord = texcoord;`);
                break;
            case "vGeometryNormal":
                strings.push(`vGeometryNormal = ${VERTEX_NORMAL_NAME}.xyz`);
                break;
            case "vEye":
                strings.push(`vEye = normalize(vec3(modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0)));`);
                break;
            default:
                console.warn(`nothing made for default varying ${item.id}`);
        }
    });
    return strings;
};
const getCustomVaryingStrings = (config) => {
    const customVaryings = config.filter(({ varyingType }) => varyingType === VARYING_TYPES.CUSTOM);
    if (!customVaryings.length)
        return [];
    const strings = [V_CUSTOM_INSTANTIATION];
    customVaryings.forEach((item) => {
        var _a;
        strings.push(`${item.id} = ${(_a = item.value) !== null && _a !== void 0 ? _a : getDefaultValueAsString(item.valueType)};`);
    });
    return strings;
};
const getAttributeVaryingStrings = (config, attributeConfig = []) => config.flatMap(({ id, attributeKey, varyingType }) => {
    if (varyingType === VARYING_TYPES.ATTRIBUTE) {
        const hasAttribute = attributeConfig.findIndex((attributeConf) => attributeConf.id === attributeKey);
        if (hasAttribute !== -1) {
            return `${id} = ${attributeKey};`;
        }
        console.warn(`varying ${id} links to ${attributeKey} but ${attributeKey} is not found`);
        return [];
    }
    return [];
});
