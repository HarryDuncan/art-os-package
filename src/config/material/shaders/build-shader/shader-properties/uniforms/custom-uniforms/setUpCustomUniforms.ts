import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import {
  ShaderPropertyTypes,
  ShaderPropertyValueTypes,
} from "../../../constants/buildShader.consts";
import { createDeclarationString } from "../../../helpers/createDeclarationString";
import { UniformObject, UniformValueConfig } from "../../../types";

export const setUpCustom = (config: UniformValueConfig[] = []) => {
  const customUniforms: UniformObject = {};
  const customStrings: string[] = [];
  config.forEach(({ value, id, valueType }) => {
    switch (valueType) {
      case ShaderPropertyValueTypes.INT:
        customUniforms[id] = { value: value ?? 0 };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.FLOAT:
        customUniforms[id] = { value: value ?? 0 };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.BOOL:
        customUniforms[id] = { value: value ?? false };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.VEC2:
        customUniforms[id] = { value: value ?? new Vector2() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.VEC3:
        customUniforms[id] = { value: value ?? new Vector3() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.VEC4:
        customUniforms[id] = { value: value ?? new Vector4() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.MAT2:
        // customUniforms[id] = { value: value ?? new Matrix2() };
        console.warn("mat 2 not configured");
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.MAT3:
        customUniforms[id] = { value: value ?? new Matrix3() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.MAT4:
        customUniforms[id] = { value: value ?? new Matrix4() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.SAMPLER2D:
        customUniforms[id] = { value: value ?? null };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.SAMPLER_CUBE:
        customUniforms[id] = { value: value ?? null };
        customStrings.push(addUniformString(id, valueType));
        break;
      case ShaderPropertyValueTypes.VOID:
        break;
      case ShaderPropertyValueTypes.CONST:
        customStrings.push(addUniformString(id, valueType));
        break;
      default:
        console.warn(`uniform configuration not set for ${valueType}`);
    }
  });
  return { customUniforms, customStrings };
};

const addUniformString = (id: string, valueType: ShaderPropertyValueTypes) =>
  createDeclarationString(
    ShaderPropertyTypes.UNIFORM as ShaderPropertyTypes,
    valueType,
    id
  );
