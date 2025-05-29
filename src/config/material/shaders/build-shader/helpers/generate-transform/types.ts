import { ShaderTransformationConfig } from "../../buildShader.types";

export type ShaderEffectParameter = Map<string, FunctionParameter>;
export type FunctionParameter = {
  id: string;
  valueType: string;
  functionId: string;
  default?: boolean;
  mappedParameterKey?: string;
};
export type FormattedFunctionConfig = ShaderTransformationConfig & {
  functionName: string;
  functionDependencyIds: string[];
  functionParameters: Map<string, FunctionParameter>;
  functionType: string;
  dontDeclare?: boolean;
};
