import { ShaderTransformationConfig } from "../../buildShader.types";

export type FunctionParameter = {
  id: string;
  valueType: string;
  functionId: string;
  default?: boolean;
};

export type FormattedFunctionConfig = ShaderTransformationConfig & {
  functionName: string;
  functionDependencyIds: string[];
  functionParameterIds: string[];
  functionInstantiationParameterIds: string[];
};
