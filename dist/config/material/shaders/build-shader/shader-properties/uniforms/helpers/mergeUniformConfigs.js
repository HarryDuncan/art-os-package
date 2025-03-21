import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";
import { EMPTY_UNIFORM_CONFIG } from "../uniforms.consts";
export const mergeUniformConfigs = (uniformConfigArray) => {
    const filteredUniformConfigs = uniformConfigArray.flatMap((config) => config !== null && config !== void 0 ? config : []);
    const mergedUniformConfig = Object.assign({}, EMPTY_UNIFORM_CONFIG);
    filteredUniformConfigs.forEach(({ defaultUniforms, customUniforms }) => {
        const { defaultUniforms: currentDefaults, customUniforms: currentCustom } = mergedUniformConfig;
        const updatedDefaults = [...currentDefaults, ...defaultUniforms].filter((value, index, self) => self.indexOf(value) === index);
        mergedUniformConfig.defaultUniforms = updatedDefaults;
        mergedUniformConfig.customUniforms = mergeCustomUniforms(currentCustom, customUniforms);
    });
    return mergedUniformConfig;
};
const mergeCustomUniforms = (currentCustomUniforms = [], addedCustomUniforms = []) => {
    const customUniforms = currentCustomUniforms || [];
    const uniformsToBeMerged = addedCustomUniforms || [];
    return removeDuplicatesByKey([...customUniforms, ...uniformsToBeMerged], "id");
};
