import { Vector2 } from "three";
import { mapAssetsToUniforms } from "./mapAssetsToUniform";
export const formatBuiltShaderUniforms = (uniforms, assetMapping, assets) => {
    const mappedUniforms = mapAssetsToUniforms(assetMapping, assets, uniforms);
    console.log(uniforms);
    const formattedUniforms = formatDefaultShaderValues(mappedUniforms);
    return formattedUniforms;
};
const formatDefaultShaderValues = (uniforms) => {
    if (uniforms.uResolution) {
        uniforms.uResolution = {
            value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio),
        };
    }
    return uniforms;
};
