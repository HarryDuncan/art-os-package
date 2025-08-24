import { SceneConfig } from "../config.types";
import { findPostEffectTransforms } from "./findPostEffectTransforms";

export const postEffectsFromConfig = (config: SceneConfig) => {
  // Find all POST_EFFECT transforms from shader materials
  const postEffectTransforms = findPostEffectTransforms(config);

  // Return the post effect transforms as the post effects
  return postEffectTransforms;
};
