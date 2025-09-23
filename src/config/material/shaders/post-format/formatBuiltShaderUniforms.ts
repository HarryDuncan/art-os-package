import { IUniform, Vector2, Vector3, Vector4 } from "three";
import { Asset } from "../../../../assets/types";
import { mapAssetsToUniforms } from "./mapAssetsToUniform";
import { SHADER_PROPERTY_TYPES, SHADER_PROPERTY_VALUE_TYPES } from "../schema";
import { ShaderParameterMap, UniformObject } from "../generator/types";

export const formatBuiltShaderUniforms = (
  parameterMap: ShaderParameterMap,
  assets: Asset[]
): { [uniform: string]: IUniform<unknown> } => {
  const uniformParameters = Array.from(parameterMap.values()).filter(
    (uniform) => uniform.parameterType === SHADER_PROPERTY_TYPES.UNIFORM
  );
  const assetMapping =
    uniformParameters.flatMap((uniformConfigs) =>
      uniformConfigs.isAssetMapped && uniformConfigs.assetMappingConfig
        ? {
            ...uniformConfigs.assetMappingConfig,
            uniformId: `${uniformConfigs.key}_${uniformConfigs.guid}`,
          }
        : []
    ) || [];

  const uniforms = uniformParameters.reduce((acc, uniform) => {
    const formattedValue = formatUniformValue(uniform.value, uniform.valueType);

    if (!uniform.guid || uniform.isDefault) {
      acc[uniform.key] = { value: formattedValue };
      return acc;
    }

    acc[`${uniform.key}_${uniform.guid}`] = { value: formattedValue };
    return acc;
  }, {} as UniformObject);
  uniforms.uTime = { value: 0 };
  const mappedUniforms = mapAssetsToUniforms(assetMapping, assets, uniforms);

  const formattedUniforms = formatDefaultShaderValues(mappedUniforms);
  return formattedUniforms as { [uniform: string]: IUniform<unknown> };
};

export const formatUniformValue = (
  value: unknown,
  valueType: string
): unknown => {
  try {
    switch (valueType) {
      case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
        return typeof value === "number" ? value : 0;

      case SHADER_PROPERTY_VALUE_TYPES.VEC2:
        if (Array.isArray(value) && value.length >= 2) {
          return new Vector2(value[0], value[1]);
        }
        return new Vector2(0, 0);

      case SHADER_PROPERTY_VALUE_TYPES.VEC3:
        if (Array.isArray(value) && value.length >= 3) {
          return new Vector3(value[0], value[1], value[2]);
        }
        return new Vector3(0, 0, 0);

      case SHADER_PROPERTY_VALUE_TYPES.VEC4:
        if (Array.isArray(value) && value.length >= 4) {
          return new Vector4(value[0], value[1], value[2], value[3]);
        }
        return new Vector4(0, 0, 0, 0);

      default:
        return value;
    }
  } catch (error) {
    console.warn(
      `Error formatting uniform value for type ${valueType}:`,
      error
    );

    // Return default values based on type
    switch (valueType) {
      case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
        return 0;
      case SHADER_PROPERTY_VALUE_TYPES.VEC2:
        return new Vector2(0, 0);
      case SHADER_PROPERTY_VALUE_TYPES.VEC3:
        return new Vector3(0, 0, 0);
      case SHADER_PROPERTY_VALUE_TYPES.VEC4:
        return new Vector4(0, 0, 0, 0);
      default:
        return value;
    }
  }
};

const formatDefaultShaderValues = (uniforms: UniformObject) => {
  if (uniforms.uResolution) {
    uniforms.uResolution = {
      value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
        window.devicePixelRatio
      ),
    };
  }

  return uniforms;
};
