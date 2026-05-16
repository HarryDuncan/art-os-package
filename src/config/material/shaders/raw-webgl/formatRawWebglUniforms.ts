import { Asset } from "../../../../assets/types";
import { SHADER_PROPERTY_TYPES, SHADER_PROPERTY_VALUE_TYPES } from "../schema";
import { ShaderParameterMap } from "../generator/types";
import { filterParametersByType } from "../utils";
import { mapAssetsToRawWebglUniforms } from "./mapAssetsToRawWebglUniform";
import {
  RawWebglTextureBinding,
  RawWebglUniformObject,
  RawWebglUniformValue,
} from "./types";

export const formatRawWebglUniforms = (
  parameterMap: ShaderParameterMap,
  assets: Asset[],
): {
  uniforms: RawWebglUniformObject;
  textureBindings: RawWebglTextureBinding[];
} => {
  const uniformParameters = filterParametersByType(
    parameterMap,
    SHADER_PROPERTY_TYPES.UNIFORM,
  );

  const assetMapping = uniformParameters.flatMap((uniformConfig) =>
    uniformConfig.isAssetMapped && uniformConfig.assetMappingConfig
      ? [
          {
            ...uniformConfig.assetMappingConfig,
            uniformId: `${uniformConfig.key}`,
          },
        ]
      : [],
  );

  const uniforms = uniformParameters.reduce((acc, uniform) => {
    const formattedValue = formatUniformValue(
      uniform.value,
      uniform.valueType,
      uniform.isArray ?? false,
      uniform.arrayLength ?? 0,
    );

    const key = uniform.guid && !uniform.isDefault ? `${uniform.key}` : uniform.key;
    acc[key] = { value: formattedValue };
    return acc;
  }, {} as RawWebglUniformObject);

  uniforms.uTime = { value: 0 };
  applyDefaultRawWebglValues(uniforms);

  const { uniforms: mappedUniforms, textureBindings } =
    mapAssetsToRawWebglUniforms(assetMapping, assets, uniforms);

  return { uniforms: mappedUniforms, textureBindings };
};

export const formatUniformValue = (
  value: unknown,
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES,
  isArray: boolean,
  arrayLength: number,
): RawWebglUniformValue => {
  if (isArray) {
    const componentCount = getComponentCount(valueType);
    const buffer = new Float32Array(arrayLength * componentCount);
    for (let i = 0; i < arrayLength; i += 1) {
      const componentValues = toComponents(value, valueType);
      buffer.set(componentValues, i * componentCount);
    }
    return buffer;
  }
  return getValue(value, valueType);
};

const getValue = (
  value: unknown,
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES,
): RawWebglUniformValue => {
  try {
    switch (valueType) {
      case SHADER_PROPERTY_VALUE_TYPES.FLOAT:
      case SHADER_PROPERTY_VALUE_TYPES.INT:
        return typeof value === "number" ? value : 0;
      case SHADER_PROPERTY_VALUE_TYPES.BOOL:
        return value ? 1 : 0;
      case SHADER_PROPERTY_VALUE_TYPES.VEC2:
        return Array.isArray(value) && value.length >= 2
          ? [Number(value[0]), Number(value[1])]
          : [0, 0];
      case SHADER_PROPERTY_VALUE_TYPES.VEC3:
        return Array.isArray(value) && value.length >= 3
          ? [Number(value[0]), Number(value[1]), Number(value[2])]
          : [0, 0, 0];
      case SHADER_PROPERTY_VALUE_TYPES.VEC4:
        return Array.isArray(value) && value.length >= 4
          ? [
              Number(value[0]),
              Number(value[1]),
              Number(value[2]),
              Number(value[3]),
            ]
          : [0, 0, 0, 0];
      default:
        return typeof value === "number" ? value : 0;
    }
  } catch (error) {
    console.warn(
      `Error formatting raw-webgl uniform value for type ${valueType}:`,
      error,
    );
    return defaultForType(valueType);
  }
};

const toComponents = (
  value: unknown,
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES,
): number[] => {
  const result = getValue(value, valueType);
  if (typeof result === "number") return [result];
  if (Array.isArray(result)) return result;
  if (result instanceof Float32Array || result instanceof Int32Array) {
    return Array.from(result);
  }
  return [0];
};

const getComponentCount = (
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES,
): number => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.VEC2:
      return 2;
    case SHADER_PROPERTY_VALUE_TYPES.VEC3:
      return 3;
    case SHADER_PROPERTY_VALUE_TYPES.VEC4:
      return 4;
    default:
      return 1;
  }
};

const defaultForType = (
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES,
): RawWebglUniformValue => {
  switch (valueType) {
    case SHADER_PROPERTY_VALUE_TYPES.VEC2:
      return [0, 0];
    case SHADER_PROPERTY_VALUE_TYPES.VEC3:
      return [0, 0, 0];
    case SHADER_PROPERTY_VALUE_TYPES.VEC4:
      return [0, 0, 0, 0];
    default:
      return 0;
  }
};

const applyDefaultRawWebglValues = (uniforms: RawWebglUniformObject) => {
  if (uniforms.uResolution) {
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
    const w = typeof window !== "undefined" ? window.innerWidth : 0;
    const h = typeof window !== "undefined" ? window.innerHeight : 0;
    uniforms.uResolution = { value: [w * dpr, h * dpr] };
  }
};
