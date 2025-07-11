import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import { SHADER_PROPERTY_VALUE_TYPES } from "../constants/shader.consts";
import { ShaderPropertyConfig, StructConfig } from "../buildShader.types";

export const getDefaultValue = (
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES,
  structConfigs?: StructConfig
) => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.STRUCT:
      if (structConfigs) {
        return structConfigs.properties.reduce((acc, curr) => {
          const key = curr.id as keyof ShaderPropertyConfig;
          // @ts-ignore
          acc[key] = curr.value ?? getDefaultValue(curr.valueType);
          return acc;
        }, {} as ShaderPropertyConfig);
      }
      return null;

    case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
      return 0.0;
    case SHADER_PROPERTY_VALUE_TYPES.INT:
      return 0;
    case SHADER_PROPERTY_VALUE_TYPES.BOOL:
      return false;
    case SHADER_PROPERTY_VALUE_TYPES.VEC2:
      return new Vector2(0, 0);
    case SHADER_PROPERTY_VALUE_TYPES.VEC3:
      return new Vector3(0, 0, 0);
    case SHADER_PROPERTY_VALUE_TYPES.VEC4:
      return new Vector4(0, 0, 0, 0);
    case SHADER_PROPERTY_VALUE_TYPES.MAT2:
      return null;
    case SHADER_PROPERTY_VALUE_TYPES.MAT3:
      return new Matrix3();
    case SHADER_PROPERTY_VALUE_TYPES.MAT4:
      return new Matrix4();
    case SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D:
      return null;
    case SHADER_PROPERTY_VALUE_TYPES.SAMPLER_CUBE:
      return null;
    default:
      return null; // Handle unsupported types or VOID type here
  }
};

export const getDefaultValueAsString = (
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES
): string => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
      return `0.0`;
    case SHADER_PROPERTY_VALUE_TYPES.INT:
      return `0`;
    case SHADER_PROPERTY_VALUE_TYPES.BOOL:
      return `false`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC2:
      return `vec2(0.0, 0.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC3:
      return `vec3(0.0, 0.0, 0.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.VEC4:
      return `vec4(0.0, 0.0, 0.0, 0.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.MAT2:
      return `mat2(1.0, 0.0, 0.0, 1.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.MAT3:
      return `mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.MAT4:
      return `mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)`;
    case SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D:
      return `sampler2D`;
    case SHADER_PROPERTY_VALUE_TYPES.SAMPLER_CUBE:
      return `samplerCube`;
    default:
      return ``; // Handle unsupported types or VOID type here
  }
};
