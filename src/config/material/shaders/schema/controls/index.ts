export type {
  ControllerType,
  SliderDimensionConfig,
  SliderControllerConfig,
  PositionControllerConfig,
  ParameterControlConfig,
  ParameterControlsConfig,
  ShaderEffectLightParameterRef,
  ShaderEffectLightConfig,
  ShaderEffectControlConfig,
} from "./types";
export type {
  FragmentLightSlotKey,
  FragmentLightGroupTypeId,
  FragmentLightSlotDefinition,
  FragmentLightGroupTypeDefinition,
  PopulateFragmentLightResult,
} from "./lightSlots";
export {
  CONTROLLER_TYPE,
  FRAGMENT_PARAMETER_GROUPS,
  VERTEX_PARAMETER_GROUPS,
  FRAGMENT_LIGHT_SLOT,
  FRAGMENT_LIGHT_GROUP_TYPE,
} from "./consts";
export { buildUniformControlsMap } from "./buildUniformControlsMap";
export {
  createFragmentLightGroup,
  type FragmentLightGroupResult,
} from "./createFragmentLightGroup";
export {
  FRAGMENT_LIGHT_SLOT_DEFINITIONS,
  FRAGMENT_LIGHT_GROUP_TYPES,
  defaultFragmentLightId,
  getLightSlotParameterId,
  isParameterCompatibleWithSlot,
  createEmptyFragmentLight,
  createParameterForSlot,
  populateFragmentLightSlots,
  collectLightParameterIds,
  ensureFragmentLightId,
} from "./lightSlots";
