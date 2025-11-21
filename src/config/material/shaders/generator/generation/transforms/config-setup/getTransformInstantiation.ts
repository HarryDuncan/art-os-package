import {
  SHADER_VARIABLE_TYPES,
  ShaderTransformationOutputConfig,
} from "../../../../schema";
import { isStruct } from "../../../../utils";
import { SHADER_VARIABLE_NAME_MAPS } from "../../../consts";
import { ShaderParameterMap } from "../../../types";
import { isDefaultParameter } from "../../helpers/parameterUtils";

export const getTransformInstantiation = (
  outputConfig: ShaderTransformationOutputConfig[],
  functionName: string,
  inputMap: ShaderParameterMap

  // todo - assignment config
) => {
  const transformParameters =
    (Array.from(inputMap.keys()) ?? []).flatMap((key) => {
      if (isDefaultParameter(key)) {
        return key;
      }
      return key;
    }) ?? [];

  const getValueDeclaration = () => {
    return "";
  };

  const getAssignedVariableName = (
    outputConfig: ShaderTransformationOutputConfig[],
    isStructResult: boolean
  ) => {
    if (isStructResult) {
      return `${functionName}_result_struct`;
    }
    const key = getKey(outputConfig[0]);
    return key;
  };

  const isStructResult = isStruct(outputConfig);
  const operator = getOperator(outputConfig, isStructResult);
  const assignedVariableName = getAssignedVariableName(
    outputConfig,
    isStructResult
  );
  return `${getValueDeclaration()} ${assignedVariableName} ${operator} ${functionName}(${transformParameters.join(
    ", "
  )});${postFunctionAssignment(functionName, outputConfig, isStructResult)}`;
};

const getOperator = (
  outputConfig: ShaderTransformationOutputConfig[],
  isStruct: boolean
) => {
  if (isStruct) {
    return `=`;
  } else {
    const { key } = outputConfig[0] ?? {};
    switch (key) {
      case SHADER_VARIABLE_TYPES.LIGHT:
        return "+=";
      case SHADER_VARIABLE_TYPES.DISCARD_COLOR:
        return "*=";
      default:
        return "=";
    }
  }
};

const postFunctionAssignment = (
  functionName: string,
  outputConfig: ShaderTransformationOutputConfig[],
  isStructResult: boolean
) => {
  if (isStructResult) {
    return outputConfig
      .map((output) => {
        return `${getKey(output)} ${getOperator(
          [output],
          false
        )} ${functionName}_result_struct.${output.key};`;
      })
      .join("\n");
  }
  return "";
};

const getKey = (outputConfigItem: ShaderTransformationOutputConfig) => {
  const { key } = outputConfigItem;

  // TODO - remove this we have proper names now
  if (
    SHADER_VARIABLE_NAME_MAPS[key as keyof typeof SHADER_VARIABLE_NAME_MAPS]
  ) {
    return SHADER_VARIABLE_NAME_MAPS[
      key as keyof typeof SHADER_VARIABLE_NAME_MAPS
    ];
  }
  return key;
};
