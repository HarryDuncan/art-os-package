import { ShaderTransformationConfig } from "../../../types";

export const getSubFunctions = (
  transformConfigs: ShaderTransformationConfig[]
) => {
  const rootFunctions = transformConfigs.filter(
    (config) => !config.isSubFunction
  );
  const subFunctions = transformConfigs.filter(
    (config) => config.isSubFunction
  );

  // todo - clean up and standardize the variable naming
  const subFunctionIds = subFunctions.map(
    (subFunction) => subFunction.functionName
  );
  rootFunctions.forEach((rootFunction) => {
    const subFunctionKeys = rootFunction.transformCode.flatMap((line) => {
      const variables = line
        .match(/{{(\w+)}}/g)
        ?.map((match) => match.replace(/[{}]/g, ""));
      if (
        variables &&
        variables.some((variable) => subFunctionIds.includes(variable))
      ) {
        return variables.filter((variable) =>
          subFunctionIds.includes(variable)
        );
      }
      return [];
    });

    console.log(subFunctionKeys);
  });
};
