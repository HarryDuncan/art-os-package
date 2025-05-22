import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../../constants/shader.consts";
import { createDeclarationString } from "../../../helpers/createDeclarationString";
import {
  ParameterConfig,
  UniformObject,
} from "../../../../../../../types/materials/index";

export const setUpCustom = (config: ParameterConfig[] = []) => {
  const customUniforms: UniformObject = {};
  const customStrings: string[] = [];
  config.forEach(({ value, id, valueType }) => {
    switch (valueType) {
      case SHADER_PROPERTY_VALUE_TYPES.INT:
        customUniforms[id] = { value: value ?? 0 };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
        customUniforms[id] = { value: value ?? 0 };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.BOOL:
        customUniforms[id] = { value: value ?? false };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.VEC2:
        customUniforms[id] = { value: value ?? new Vector2() };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.VEC3:
        customUniforms[id] = { value: value ?? new Vector3() };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.VEC4:
        customUniforms[id] = { value: value ?? new Vector4() };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.MAT2:
        // customUniforms[id] = { value: value ?? new Matrix2() };
        console.warn("mat 2 not configured");
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.MAT3:
        customUniforms[id] = { value: value ?? new Matrix3() };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.MAT4:
        customUniforms[id] = { value: value ?? new Matrix4() };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.SAMPLER2D:
        customUniforms[id] = { value: value ?? null };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.SAMPLER_CUBE:
        customUniforms[id] = { value: value ?? null };
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      case SHADER_PROPERTY_VALUE_TYPES.VOID:
        break;
      case SHADER_PROPERTY_VALUE_TYPES.CONST:
        customStrings.push(
          addUniformString(
            id,
            valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
          )
        );
        break;
      default:
        console.warn(`uniform configuration not set for ${String(valueType)}`);
    }
  });
  return { customUniforms, customStrings };
};

const addUniformString = (
  id: string,
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES
) =>
  createDeclarationString(
    SHADER_PROPERTY_TYPES.UNIFORM as keyof typeof SHADER_PROPERTY_TYPES,
    valueType,
    id
  );
