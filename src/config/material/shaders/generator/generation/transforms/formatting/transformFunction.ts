import { FragmentEffectConfig, VertexEffectConfig } from "../../../../schema";
import {
  DefinedEffectFunction,
  ShaderTransformationConfig,
} from "../../../types";
import { getFunctionInputs } from "../../helpers/parameterMap";
import { shaderValueTypeInstantiation } from "../../helpers/shaderValues";
import { formatTransformCode } from "./transformCode";

export const transformFunction = (
  transformationConfigs: ShaderTransformationConfig[],
  shaderEffectConfig: FragmentEffectConfig | VertexEffectConfig
): DefinedEffectFunction[] => {
  const { guid: shaderEffectId } = shaderEffectConfig;
  return transformationConfigs.map(
    ({
      // outputConfig,
      inputMap,
      functionName,
      transformCode,
      // assignedVariableId,
      key: functionKey,
      functionType,
    }) => {
      //const returnTypeString = shaderValueTypeInstantiation(returnValue);
      const functionInputs = getFunctionInputs(inputMap, shaderEffectId);
      // TODO - handle output config
      const functionDeclaration = `vec4 ${functionName}(${[
        ...functionInputs,
      ].join(", ")}){`;

      const formattedFunctionContent = formatTransformCode(
        transformCode,
        inputMap,
        transformationConfigs,
        shaderEffectId
      );

      const shaderFunctionConfig = {
        key: functionKey,
        functionType,
        // returnValue,
        functionName: functionName,
        // assignedVariableId,
        inputMap,
        // TODO - handle output config
        functionDefinition: [
          functionDeclaration,
          ...formattedFunctionContent,
          `}`,
        ].join("\n"),
      };
      return shaderFunctionConfig as DefinedEffectFunction;
    }
  );
};
