import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";
import { ParameterConfig } from "../../../buildShader.types";

export const mergeUniformConfigs = (
  uniformConfigArray: (ParameterConfig[] | undefined | null)[]
) => {
  const filteredUniformConfigs = uniformConfigArray.flatMap(
    (config) => config ?? []
  );
  return removeDuplicatesByKey(
    filteredUniformConfigs,
    "id"
  ) as unknown as ParameterConfig[];
};
