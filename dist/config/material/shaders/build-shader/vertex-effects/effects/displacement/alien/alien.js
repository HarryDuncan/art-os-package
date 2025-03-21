import { twisterDistortion } from "../../../../shader-properties/functions/distortion/distortion";
import { alienTransform } from "./alienTransform";
export const distortFunctions = () => [
    { id: "twister", functionDefinition: twisterDistortion },
];
export const distortUniforms = () => ({
    defaultUniforms: [],
    customUniforms: [{ id: "uRadius", valueType: "FLOAT", value: 1.5 }],
});
export const distortVaryings = () => [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
];
export const alienDistort = (previousPointName) => {
    const uniformConfig = distortUniforms();
    const varyingConfig = distortVaryings();
    const transformation = alienTransform();
    const requiredFunctions = distortFunctions();
    return {
        attributeConfig: [],
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
