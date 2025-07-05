import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../constants/shader.consts";
import { createDeclarationString } from "../../helpers/createDeclarationString";
import { getDefaultValueAsString } from "../../helpers/getDefaultValue";
import { VARYING_TYPES } from "./varyings.consts";
import {
  VERTEX_NORMAL_NAME,
  VERTEX_POINT_NAME,
} from "../../vertex-effects/vertexEffects.consts";
import { ParameterConfig } from "../../../../../../types/materials/index";
import {
  V_CUSTOM_INSTANTIATION,
  V_DECLARATION,
  V_DEFAULT_INSTANTIATION,
} from "../../constants";

export const buildVaryings = (
  varyingSchema: ParameterConfig[],
  attributeConfigs: ParameterConfig[]
) => {
  const declaration = varyingDeclarations(varyingSchema);
  const instantiation = varyingInstantiation(varyingSchema, attributeConfigs);
  return { declaration, instantiation };
};

const varyingDeclarations = (config: ParameterConfig[]) => {
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
  varyingConfigs: ParameterConfig[],
  attributeConfigs: ParameterConfig[]
) => {
  const defaultVaryingStrings = getDefaultVaryingString(varyingConfigs);
  const attributeVaryingStrings = getAttributeVaryingStrings(
    varyingConfigs,
    attributeConfigs
  );
  const customVaryingsStrings = getCustomVaryingStrings(varyingConfigs);

  return [
    ...defaultVaryingStrings,
    ...attributeVaryingStrings,
    ...customVaryingsStrings,
  ].join(" \n ");
};

const getDefaultVaryingString = (config: ParameterConfig[]) => {
  const defaultVaryings: ParameterConfig[] = config.filter(
    (item) => item.varyingConfig?.varyingType === VARYING_TYPES.DEFAULT
  );
  if (!defaultVaryings.length) return [];
  const strings = [V_DEFAULT_INSTANTIATION];
  defaultVaryings.forEach((item: ParameterConfig) => {
    switch (item.id) {
      case "vUv":
        strings.push("vUv = uv;");
        break;
      case "vPosition":
        strings.push(`vPosition = ${VERTEX_POINT_NAME};`);
        break;
      case "vNormal":
        strings.push(
          `vNormal = (modelMatrix *  vec4(${VERTEX_NORMAL_NAME})).xyz;`
        );
        break;
      case "vViewDirection":
        strings.push(
          `vViewDirection = normalize(vec3(modelViewMatrix * vec4(${VERTEX_POINT_NAME})));`
        );
        break;
      // case "vModelViewMatrix":
      //   strings.push("vModelViewMatrix = modelViewMatrix;");
      //   break;
      // case "vNormalInterpolation":
      //   strings.push(
      //     `vNormalInterpolation = normalize(normalMatrix  * ${VERTEX_NORMAL_NAME}.xyz);`
      //   );
      //   break;
      // case "vTexCoord":
      //   strings.push(`vTexCoord = texcoord;`);
      //   break;
      // case "vGeometryNormal":
      //   strings.push(`vGeometryNormal = ${VERTEX_NORMAL_NAME}.xyz`);
      //   break;
      // case "vEye":
      //   strings.push(
      //     `vEye = normalize(vec3(modelViewMatrix * vec4(${VERTEX_POINT_NAME}.xyz, 1.0)));`
      //   );
      //   break;
      default:
        console.warn(`nothing made for default varying ${item.id}`);
    }
  });
  return strings;
};

const getCustomVaryingStrings = (config: ParameterConfig[]) => {
  const customVaryings = config.filter(
    ({ varyingConfig }) => varyingConfig?.varyingType === VARYING_TYPES.CUSTOM
  );
  if (!customVaryings.length) return [];
  const strings = [V_CUSTOM_INSTANTIATION];
  customVaryings.forEach((item: ParameterConfig) => {
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
  config: ParameterConfig[],
  attributeConfigs: ParameterConfig[] = []
) =>
  config.flatMap(({ id, varyingConfig }) => {
    if (varyingConfig?.varyingType === VARYING_TYPES.ATTRIBUTE) {
      const hasAttribute = attributeConfigs.findIndex(
        (attributeConf) => attributeConf.id === varyingConfig?.attributeKey
      );
      if (hasAttribute !== -1) {
        return `${id} = ${varyingConfig?.attributeKey};`;
      }
      console.warn(
        `varying ${id} links to ${varyingConfig?.attributeKey} but ${varyingConfig?.attributeKey} is not found`
      );
      return [];
    }
    return [];
  });
