import { importShader } from "./importShader";
export const configureShaders = (shaderConfig, uniforms, assets) => {
    const { shaderId, fragmentShaderId, vertexShaderId, assetMapping } = shaderConfig;
    const { fragmentShader, vertexShader, setUpDefaultUniforms } = importShader(shaderId, vertexShaderId, fragmentShaderId);
    const configuredUniforms = configureUniforms(uniforms, setUpDefaultUniforms);
    mapAssets(configuredUniforms, assetMapping !== null && assetMapping !== void 0 ? assetMapping : [], assets !== null && assets !== void 0 ? assets : []);
    // TODO - return default shaders and log that the shader ids didn't work
    return { fragmentShader, vertexShader, configuredUniforms };
};
const configureUniforms = (uniforms, setUpDefaultUniforms) => {
    if (setUpDefaultUniforms) {
        return setUpDefaultUniforms(uniforms);
    }
    return uniforms;
};
// TODO - refactor to use mapAssetsToUniforms
const mapAssets = (uniforms, assetMapping, assets) => {
    if (assetMapping) {
        assetMapping.forEach((mapping) => {
            const mappedAsset = getMappedAsset(mapping, assets);
            if (mappedAsset) {
                uniforms[mapping.uniform] = { value: mappedAsset };
            }
        });
    }
    return uniforms;
};
const getMappedAsset = (assetMapping, assets) => {
    const mappedAsset = assets.find((asset) => asset.id === assetMapping.assetId);
    if (mappedAsset && mappedAsset.data) {
        const texture = mappedAsset.data;
        return texture;
    }
    console.warn(`no mapped asset found for ${assetMapping.assetId}`);
};
