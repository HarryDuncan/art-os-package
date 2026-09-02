import {
  ResolvedSceneBackground,
  SceneBackground,
} from "../config.types";

export const resolveSceneBackground = (
  background: SceneBackground | undefined,
  _assets?: unknown,
): ResolvedSceneBackground => {
  if (background?.type === "color" && background.color) {
    return background;
  }

  return { type: "color", color: "white" };
};
