import { vertexFilterTransformation } from "./vertexFilterTransformation";
export const vertexFilterFunctions = () => [];
export const vertexFilterUniforms = () => ({
    defaultUniforms: [],
    customUniforms: [{ id: "uReduced", valueType: "FLOAT", value: 5.0 }],
});
export const vertexFilterVaryings = () => [];
export const vertexFilter = () => {
    const uniformConfig = vertexFilterUniforms();
    const varyingConfig = vertexFilterVaryings();
    const transformation = vertexFilterTransformation();
    const requiredFunctions = vertexFilterFunctions();
    return {
        attributeConfig: [],
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
