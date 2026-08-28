import {
  setMaterialUniforms,
  ParameterControlSelector,
} from "../parameter-control";

/** @deprecated Prefer `setMaterialUniforms` from parameter-control. */
export type ExternalUpdateSelector = ParameterControlSelector;

/** @deprecated Prefer `setMaterialUniforms` from parameter-control. */
export const externalUpdate = (
  selector: ExternalUpdateSelector,
  data: Record<string, unknown>,
) => setMaterialUniforms(selector, data);
