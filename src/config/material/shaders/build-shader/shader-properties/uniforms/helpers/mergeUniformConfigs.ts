import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";
import { ShaderPropertyConfig, UniformConfig } from "../../../types";
import { EMPTY_UNIFORM_CONFIG } from "../uniforms.consts";

export const mergeUniformConfigs = (
  uniformConfigArray: (UniformConfig | undefined | null)[]
) => {
  const filteredUniformConfigs = uniformConfigArray.flatMap(
    (config) => config ?? []
  );
  const mergedUniformConfig = { ...EMPTY_UNIFORM_CONFIG } as UniformConfig;
  filteredUniformConfigs.forEach(({ defaultUniforms, customUniforms }) => {
    const { defaultUniforms: currentDefaults, customUniforms: currentCustom } =
      mergedUniformConfig;
    const updatedDefaults = [...currentDefaults, ...defaultUniforms].filter(
      (value, index, self) => self.indexOf(value) === index
    );
    mergedUniformConfig.defaultUniforms = updatedDefaults;
    mergedUniformConfig.customUniforms = mergeCustomUniforms(
      currentCustom,
      customUniforms
    );
  });
  return mergedUniformConfig;
};

const mergeCustomUniforms = (
  currentCustomUniforms: ShaderPropertyConfig[] = [],
  addedCustomUniforms: ShaderPropertyConfig[] = []
) => {
  const customUniforms = currentCustomUniforms || [];
  const uniformsToBeMerged = addedCustomUniforms || [];
  return removeDuplicatesByKey(
    [...customUniforms, ...uniformsToBeMerged],
    "id"
  ) as ShaderPropertyConfig[];
};
