import { ResolvedSceneBackground } from "../config.types";

export const hasResolvedSceneBackground = (
  background: ResolvedSceneBackground | undefined,
): boolean => Boolean(background?.type === "color" && background.color);
