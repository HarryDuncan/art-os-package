"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFragmentShader = exports.buildShader = void 0;
const buildShader_consts_1 = require("./constants/buildShader.consts");
const setUpFragmentEffects_1 = require("./fragment-effects/setUpFragmentEffects");
const buildAttributes_1 = require("./shader-properties/attributes/buildAttributes");
const mergeAttributeConfigs_1 = require("./shader-properties/attributes/helpers/mergeAttributeConfigs");
const buildUniforms_1 = require("./shader-properties/uniforms/buildUniforms");
const mergeUniformConfigs_1 = require("./shader-properties/uniforms/helpers/mergeUniformConfigs");
const uniforms_consts_1 = require("./shader-properties/uniforms/uniforms.consts");
const buildVaryings_1 = require("./shader-properties/varyings/buildVaryings");
const mergeVaryingConfigs_1 = require("./shader-properties/varyings/helpers/mergeVaryingConfigs");
const setUpVertexEffects_1 = require("./vertex-effects/setUpVertexEffects");
const buildStructs_1 = require("./shader-properties/structs/buildStructs");
const mergeStructConfigs_1 = require("./shader-properties/structs/mergeStructConfigs");
const buildShader = (shaderConfig) => {
    const { vertexEffectConfigs, fragmentEffectConfigs, uniformConfig, varyingConfig, attributeConfig, structConfigs, } = shaderConfig;
    const fragmentEffects = (0, setUpFragmentEffects_1.setUpFragmentEffects)(fragmentEffectConfigs);
    const vertexEffects = (0, setUpVertexEffects_1.setUpVertexEffects)(vertexEffectConfigs);
    // pass the parsed uniform config first so the values override any values defined in the other effects - vertex/fragment
    const shaderUniforms = [
        uniformConfig !== null && uniformConfig !== void 0 ? uniformConfig : Object.assign({}, uniforms_consts_1.EMPTY_UNIFORM_CONFIG),
        vertexEffects.uniformConfigs,
        fragmentEffects.uniformConfigs,
    ];
    const mergedShaderUniforms = (0, mergeUniformConfigs_1.mergeUniformConfigs)(shaderUniforms);
    const shaderAttributes = [
        attributeConfig,
        fragmentEffects.attributeConfigs,
        vertexEffects.attributeConfigs,
    ];
    const combinedAttributeConfigs = (0, mergeAttributeConfigs_1.mergeAttributeConfigs)(shaderAttributes);
    const attributes = (0, buildAttributes_1.buildAttributes)(combinedAttributeConfigs);
    const shaderVaryings = [
        vertexEffects.varyingConfigs,
        fragmentEffects.varyingConfigs,
        varyingConfig !== null && varyingConfig !== void 0 ? varyingConfig : [],
    ];
    const mergedShaderVaryings = (0, mergeVaryingConfigs_1.mergeVaryingConfigs)(shaderVaryings);
    const { uniforms, uniformDeclaration } = (0, buildUniforms_1.buildUniforms)(mergedShaderUniforms);
    const { declaration: varyingDeclaration, instantiation: varyingInstantiation, } = (0, buildVaryings_1.buildVaryings)(mergedShaderVaryings, combinedAttributeConfigs);
    const shaderStructConfigs = [
        vertexEffects.structConfigs,
        fragmentEffects.structConfigs,
        structConfigs !== null && structConfigs !== void 0 ? structConfigs : [],
    ];
    const mergedStructConfig = (0, mergeStructConfigs_1.mergeStructConfigs)(shaderStructConfigs);
    const structDeclaration = (0, buildStructs_1.buildStruct)(mergedStructConfig);
    const vertexShader = formatVertexShader(structDeclaration, attributes, uniformDeclaration, varyingDeclaration, varyingInstantiation, vertexEffects.requiredFunctions, vertexEffects.transformations, vertexEffects.viewMatrix);
    console.log(vertexShader);
    const fragmentShader = (0, exports.formatFragmentShader)(structDeclaration, uniformDeclaration, varyingDeclaration, fragmentEffects.requiredFunctions, fragmentEffects.transformations, fragmentEffects.fragColor);
    console.log(fragmentShader);
    return {
        vertexShader,
        fragmentShader,
        uniforms,
        attributeConfigs: combinedAttributeConfigs,
    };
};
exports.buildShader = buildShader;
const formatVertexShader = (structDeclaration, attributes, uniformDeclarations, varyingDeclaration, varyingInstantiation, vertexFunctions, vertexTransformations, viewMatrix) => {
    return [
        structDeclaration,
        attributes,
        uniformDeclarations,
        varyingDeclaration,
        vertexFunctions
            .map(({ functionDefinition }) => functionDefinition)
            .join(""),
        buildShader_consts_1.MAIN_START,
        buildShader_consts_1.VERTEX_POINT_INSTANTIATION,
        buildShader_consts_1.VERTEX_NORMAL_INSTANTIATION,
        vertexTransformations,
        varyingInstantiation,
        viewMatrix,
        buildShader_consts_1.MAIN_END,
    ].join(" \n ");
};
const formatFragmentShader = (structDeclaration, uniformDeclaration, varyingDeclaration, fragmentFunctions, fragmentTransformations, fragColor) => {
    const shaderCodeArray = [
        structDeclaration,
        uniformDeclaration,
        varyingDeclaration,
        ...fragmentFunctions.map(({ functionDefinition }) => functionDefinition),
        buildShader_consts_1.MAIN_START,
        buildShader_consts_1.FRAG_COLOR_INSTANTIATION,
        fragmentTransformations,
        fragColor,
        buildShader_consts_1.MAIN_END,
    ];
    const filteredShaderCode = shaderCodeArray.filter((str) => str !== "");
    return filteredShaderCode.join(" \n ");
};
exports.formatFragmentShader = formatFragmentShader;
