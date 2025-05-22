import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";
import { UniformConfig } from "../../../buildShader.types";

export const mergeUniformConfigs = (
  uniformConfigArray: (UniformConfig[] | undefined | null)[]
) => {
  const filteredUniformConfigs = uniformConfigArray.flatMap(
    (config) => config ?? []
  );
  return removeDuplicatesByKey(
    filteredUniformConfigs,
    "id"
  ) as unknown as UniformConfig[];
};
