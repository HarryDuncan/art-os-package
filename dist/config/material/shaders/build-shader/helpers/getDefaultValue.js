"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultValueAsString = exports.getDefaultValue = void 0;
const three_1 = require("three");
const buildShader_consts_1 = require("../constants/buildShader.consts");
const getDefaultValue = (valueType, structConfigs) => {
    switch (valueType) {
        case buildShader_consts_1.ShaderPropertyValueTypes.STRUCT:
            if (structConfigs) {
                return structConfigs.properties.reduce((acc, curr) => {
                    var _a;
                    const key = curr.id;
                    // @ts-ignore
                    acc[key] = (_a = curr.value) !== null && _a !== void 0 ? _a : (0, exports.getDefaultValue)(curr.valueType);
                    return acc;
                }, {});
            }
            return null;
        case buildShader_consts_1.ShaderPropertyValueTypes.FLOAT:
            return 0.0;
        case buildShader_consts_1.ShaderPropertyValueTypes.INT:
            return 0;
        case buildShader_consts_1.ShaderPropertyValueTypes.BOOL:
            return false;
        case buildShader_consts_1.ShaderPropertyValueTypes.VEC2:
            return new three_1.Vector2(0, 0);
        case buildShader_consts_1.ShaderPropertyValueTypes.VEC3:
            return new three_1.Vector3(0, 0, 0);
        case buildShader_consts_1.ShaderPropertyValueTypes.VEC4:
            return new three_1.Vector4(0, 0, 0, 0);
        case buildShader_consts_1.ShaderPropertyValueTypes.MAT2:
            return null;
        case buildShader_consts_1.ShaderPropertyValueTypes.MAT3:
            return new three_1.Matrix3();
        case buildShader_consts_1.ShaderPropertyValueTypes.MAT4:
            return new three_1.Matrix4();
        case buildShader_consts_1.ShaderPropertyValueTypes.SAMPLER2D:
            return null;
        case buildShader_consts_1.ShaderPropertyValueTypes.SAMPLER_CUBE:
            return null;
        default:
            return null; // Handle unsupported types or VOID type here
    }
};
exports.getDefaultValue = getDefaultValue;
const getDefaultValueAsString = (valueType) => {
    switch (valueType) {
        case buildShader_consts_1.ShaderPropertyValueTypes.FLOAT:
            return `0.0`;
        case buildShader_consts_1.ShaderPropertyValueTypes.INT:
            return `0`;
        case buildShader_consts_1.ShaderPropertyValueTypes.BOOL:
            return `false`;
        case buildShader_consts_1.ShaderPropertyValueTypes.VEC2:
            return `vec2(0.0, 0.0)`;
        case buildShader_consts_1.ShaderPropertyValueTypes.VEC3:
            return `vec3(0.0, 0.0, 0.0)`;
        case buildShader_consts_1.ShaderPropertyValueTypes.VEC4:
            return `vec4(0.0, 0.0, 0.0, 0.0)`;
        case buildShader_consts_1.ShaderPropertyValueTypes.MAT2:
            return `mat2(1.0, 0.0, 0.0, 1.0)`;
        case buildShader_consts_1.ShaderPropertyValueTypes.MAT3:
            return `mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)`;
        case buildShader_consts_1.ShaderPropertyValueTypes.MAT4:
            return `mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)`;
        case buildShader_consts_1.ShaderPropertyValueTypes.SAMPLER2D:
            return `sampler2D`;
        case buildShader_consts_1.ShaderPropertyValueTypes.SAMPLER_CUBE:
            return `samplerCube`;
        default:
            return ``; // Handle unsupported types or VOID type here
    }
};
exports.getDefaultValueAsString = getDefaultValueAsString;
