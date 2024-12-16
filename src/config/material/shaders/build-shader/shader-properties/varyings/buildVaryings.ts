import { ShaderPropertyTypes } from "../../constants/buildShader.consts";
import { AttributeConfig, VaryingConfig } from "../../types";
import { createDeclarationString } from "../../helpers/createDeclarationString";
import { getDefaultValueAsString } from "../../helpers/getDefaultValue";
import {
  VARYING_TYPES,
  V_CUSTOM_INSTANTIATION,
  V_DECLARATION,
  V_DEFAULT_INSTANTIATION,
} from "./varyings.consts";

export const buildVaryings = (
  varyingSchema: VaryingConfig[],
  attributeConfig: AttributeConfig[],
  vertexTransformationName: string
) => {
  const declaration = varyingDeclarations(varyingSchema);
  const instantiation = varyingInstantiation(
    varyingSchema,
    attributeConfig,
    vertexTransformationName
  );
  return { declaration, instantiation };
};

const varyingDeclarations = (config: VaryingConfig[]) => {
  const declarationStrings = config.map(({ id, valueType }) =>
    createDeclarationString(
      ShaderPropertyTypes.VARYING as ShaderPropertyTypes,
      valueType,
      id
    )
  );
  const declaration = [V_DECLARATION, ...declarationStrings].join(" \n ");
  return declaration;
};

const varyingInstantiation = (
  varyingConfig: VaryingConfig[],
  attributeConfig: AttributeConfig[],
  vertexTransformationName: string
) => {
  const defaultVaryingStrings = getDefaultVaryingString(
    varyingConfig,
    vertexTransformationName
  );
  const attributeVaryingStrings = getAttributeVaryingStrings(
    varyingConfig,
    attributeConfig
  );
  const customVaryingsStrings = getCustomVaryingStrings(varyingConfig);
  return [
    ...defaultVaryingStrings,
    ...attributeVaryingStrings,
    ...customVaryingsStrings,
  ].join(" \n ");
};

const getDefaultVaryingString = (
  config: VaryingConfig[],
  vertexTransformationName: string
) => {
  const defaultVaryings: VaryingConfig[] = config.filter(
    (item) => item.varyingType === VARYING_TYPES.DEFAULT
  );
  if (!defaultVaryings.length) return [];
  const strings = [V_DEFAULT_INSTANTIATION];
  defaultVaryings.forEach((item: VaryingConfig) => {
    switch (item.id) {
      case "vUv":
        strings.push("vUv = uv;");
        break;
      case "vPosition":
        strings.push(`vPosition = ${vertexTransformationName}.xyz;`);
        break;
      case "vNormal":
        strings.push(`vNormal = normal;`);
        break;
      case "vModelViewMatrix":
        strings.push("vModelViewMatrix = modelViewMatrix;");
        break;
      case "vNormalInterpolation":
        strings.push("vNormalInterpolation = normalMatrix * normal;");
        break;
      case "vTexCoord":
        strings.push(`vTexCoord = texcoord;`);
        break;
      case "vGeometryNormal":
        strings.push("vGeometryNormal = normal;");
        break;
      case "vEye":
        strings.push(
          `vEye = normalize(vec3(modelViewMatrix * vec4(${vertexTransformationName}.xyz, 1.0)));`
        );
        break;
      default:
        console.warn(`nothing made for default varying ${item.id}`);
    }
  });
  return strings;
};

const getCustomVaryingStrings = (config: VaryingConfig[]) => {
  const customVaryings = config.filter(
    ({ varyingType }) => varyingType === VARYING_TYPES.CUSTOM
  );
  if (!customVaryings.length) return [];
  const strings = [V_CUSTOM_INSTANTIATION];
  customVaryings.forEach((item: VaryingConfig) => {
    strings.push(
      `${item.id} = ${item.value ?? getDefaultValueAsString(item.valueType)};`
    );
  });
  return strings;
};

const getAttributeVaryingStrings = (
  config: VaryingConfig[],
  attributeConfig: AttributeConfig[] = []
) =>
  config.flatMap(({ id, attributeKey, varyingType }) => {
    if (varyingType === VARYING_TYPES.ATTRIBUTE) {
      const hasAttribute = attributeConfig.findIndex(
        (attributeConf) => attributeConf.id === attributeKey
      );
      if (hasAttribute !== -1) {
        return `${id} = ${attributeKey};`;
      }
      console.warn(
        `varying ${id} links to ${attributeKey} but ${attributeKey} is not found`
      );
      return [];
    }
    return [];
  });
