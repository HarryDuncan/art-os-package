import {
  EffectConfig,
  SHADER_PROPERTY_TYPES,
  ShaderTransformationOutputConfig,
  ShaderTransformationSchema,
} from "../../../../schema";
import { isStruct } from "../../../../utils";
import { ShaderParameterMap } from "../../../types";
import { isDefaultParameter } from "../../helpers/parameterUtils";

const getParameterFromSchemaKey = (
  schemaKey: string,
  guid: string,
  inputMap: ShaderParameterMap
) => {
  let parameterKey = schemaKey;
  console.log("inputMap", inputMap);
  console.log("schemaKey", schemaKey);
  console.log("guid", guid);
  Array.from(inputMap.keys()).forEach((key) => {
    console.log("key", key);
    const [parameterType, inputParameterName, inputParameterSchemaGuid] =
      key.split("_");
    const [parameterName, schemaGuid] = schemaKey.split("_");
    if (
      inputParameterName === parameterName &&
      inputParameterSchemaGuid === schemaGuid
    ) {
      if (parameterType === "a" || parameterType === "c") {
        console.log("returning contstant" + key);
        parameterKey = key;
      } else {
        parameterKey = `${parameterType}_${inputParameterName}_${inputParameterSchemaGuid}_${guid}`;
      }
    }
  });
  return parameterKey;
};
export const getTransformCode = (
  transformSchema: ShaderTransformationSchema,
  transformName: string,
  subEffectsKeys: string[],
  inputMap: ShaderParameterMap,
  effectConfig: EffectConfig
) => {
  const { transformCode, outputConfig } = transformSchema;
  const { guid } = effectConfig;
  const formattedEffectCodeLines = transformCode.map((line) => {
    return line.replace(/{{(\w+)}}/g, (match, key) => {
      if (isDefaultParameter(key)) {
        return `${key}_${guid}`;
      }
      const parameterKey = getParameterFromSchemaKey(key, guid, inputMap);
      return parameterKey;
    });
  });

  const internalStructDeclaration = createInternalStructDeclaration(
    transformName,
    outputConfig
  );
  return [internalStructDeclaration, ...formattedEffectCodeLines, "}"];
};

const createInternalStructDeclaration = (
  transformName: string,
  outputConfig: ShaderTransformationOutputConfig[]
) => {
  if (isStruct(outputConfig)) {
    return `${transformName}_result result;`;
  }
  return "";
};
