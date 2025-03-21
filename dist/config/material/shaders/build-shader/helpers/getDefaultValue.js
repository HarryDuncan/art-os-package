import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import { ShaderPropertyValueTypes } from "../constants/buildShader.consts";
export const getDefaultValue = (valueType, structConfigs) => {
    switch (valueType) {
        case ShaderPropertyValueTypes.STRUCT:
            if (structConfigs) {
                return structConfigs.properties.reduce((acc, curr) => {
                    var _a;
                    const key = curr.id;
                    // @ts-ignore
                    acc[key] = (_a = curr.value) !== null && _a !== void 0 ? _a : getDefaultValue(curr.valueType);
                    return acc;
                }, {});
            }
            return null;
        case ShaderPropertyValueTypes.FLOAT:
            return 0.0;
        case ShaderPropertyValueTypes.INT:
            return 0;
        case ShaderPropertyValueTypes.BOOL:
            return false;
        case ShaderPropertyValueTypes.VEC2:
            return new Vector2(0, 0);
        case ShaderPropertyValueTypes.VEC3:
            return new Vector3(0, 0, 0);
        case ShaderPropertyValueTypes.VEC4:
            return new Vector4(0, 0, 0, 0);
        case ShaderPropertyValueTypes.MAT2:
            return null;
        case ShaderPropertyValueTypes.MAT3:
            return new Matrix3();
        case ShaderPropertyValueTypes.MAT4:
            return new Matrix4();
        case ShaderPropertyValueTypes.SAMPLER2D:
            return null;
        case ShaderPropertyValueTypes.SAMPLER_CUBE:
            return null;
        default:
            return null; // Handle unsupported types or VOID type here
    }
};
export const getDefaultValueAsString = (valueType) => {
    switch (valueType) {
        case ShaderPropertyValueTypes.FLOAT:
            return `0.0`;
        case ShaderPropertyValueTypes.INT:
            return `0`;
        case ShaderPropertyValueTypes.BOOL:
            return `false`;
        case ShaderPropertyValueTypes.VEC2:
            return `vec2(0.0, 0.0)`;
        case ShaderPropertyValueTypes.VEC3:
            return `vec3(0.0, 0.0, 0.0)`;
        case ShaderPropertyValueTypes.VEC4:
            return `vec4(0.0, 0.0, 0.0, 0.0)`;
        case ShaderPropertyValueTypes.MAT2:
            return `mat2(1.0, 0.0, 0.0, 1.0)`;
        case ShaderPropertyValueTypes.MAT3:
            return `mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)`;
        case ShaderPropertyValueTypes.MAT4:
            return `mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)`;
        case ShaderPropertyValueTypes.SAMPLER2D:
            return `sampler2D`;
        case ShaderPropertyValueTypes.SAMPLER_CUBE:
            return `samplerCube`;
        default:
            return ``; // Handle unsupported types or VOID type here
    }
};
