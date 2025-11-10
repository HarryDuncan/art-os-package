import { DEFAULT_PARAMETERS } from "../../../schema";

const defaultParameterKeys = DEFAULT_PARAMETERS.map((param) => param.key);

export const isDefaultParameter = (parameterKey: string) =>
  defaultParameterKeys.includes(parameterKey);
