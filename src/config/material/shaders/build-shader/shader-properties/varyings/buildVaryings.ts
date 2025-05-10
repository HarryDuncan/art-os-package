import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";
import { getDefaultValueAsString } from "../../helpers/getDefaultValue";
import {
  VARYING_TYPES,
  V_CUSTOM_INSTANTIATION,
  V_DECLARATION,
  V_DEFAULT_INSTANTIATION,
} from "./varyings.consts";
import {
  VERTEX_NORMAL_NAME,
  VERTEX_POINT_NAME,
} from "../../vertex-effects/vertexEffects.consts";
import {
  VaryingConfig,
  AttributeConfig,
} from "../../../../../../types/materials/index";

export const buildVaryings = (
  varyingSchema: VaryingConfig[],
  attributeConfig: AttributeConfig[]
) => {
  const declaration = varyingDeclarations(varyingSchema);
  const instantiation = varyingInstantiation(varyingSchema, attributeConfig);
  return { declaration, instantiation };
};

const varyingDeclarations = (config: VaryingConfig[]) => {
  const declarationStrings = config.map(({ id, valueType }) =>
    createDeclarationString(
      SHADER_PROPERTY_TYPES.VARYING as keyof typeof SHADER_PROPERTY_TYPES,
      valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
      id
    )
  );
  const declaration = [V_DECLARATION, ...declarationStrings].join(" \n ");
  return declaration;
};

const varyingInstantiation = (
  varyingConfig: VaryingConfig[],
  attributeConfig: AttributeConfig[]
) => {
  const defaultVaryingStrings = getDefaultVaryingString(varyingConfig);
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

const getDefaultVaryingString = (config: VaryingConfig[]) => {
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
        strings.push(`vPosition = ${VERTEX_POINT_NAME}.xyz;`);
        break;
      case "vNormal":
        strings.push(`vNormal = ${VERTEX_NORMAL_NAME}.xyz;`);
        break;
      case "vModelViewMatrix":
        strings.push("vModelViewMatrix = modelViewMatrix;");
        break;
      case "vNormalInterpolation":
        strings.push(
          `vNormalInterpolation = normalize(normalMatrix  * ${VERTEX_NORMAL_NAME}.xyz);`
        );
        break;
      case "vTexCoord":
        strings.push(`vTexCoord = texcoord;`);
        break;
      case "vGeometryNormal":
        strings.push(`vGeometryNormal = ${VERTEX_NORMAL_NAME}.xyz`);
        break;
      case "vEye":
        strings.push(
          `vEye = normalize(vec3(modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0)));`
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
      `${item.id} = ${
        item.value ??
        getDefaultValueAsString(
          item.valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES
        )
      };`
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
