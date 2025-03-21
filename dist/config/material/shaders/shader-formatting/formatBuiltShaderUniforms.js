"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBuiltShaderUniforms = void 0;
const three_1 = require("three");
const mapAssetsToUniform_1 = require("./mapAssetsToUniform");
const formatBuiltShaderUniforms = (uniforms, assetMapping, assets) => {
    const mappedUniforms = (0, mapAssetsToUniform_1.mapAssetsToUniforms)(assetMapping, assets, uniforms);
    console.log(uniforms);
    const formattedUniforms = formatDefaultShaderValues(mappedUniforms);
    return formattedUniforms;
};
exports.formatBuiltShaderUniforms = formatBuiltShaderUniforms;
const formatDefaultShaderValues = (uniforms) => {
    if (uniforms.uResolution) {
        uniforms.uResolution = {
            value: new three_1.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio),
        };
    }
    return uniforms;
};
