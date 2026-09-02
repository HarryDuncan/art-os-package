import { parseViewDimension } from "./parseViewDimension";

export const resolveViewDimensionToPx = (
  value: string | undefined,
  viewportDimension: number,
): number => {
  const parsed = parseViewDimension(value);
  if (!parsed || !Number.isFinite(viewportDimension) || viewportDimension <= 0) {
    return viewportDimension;
  }

  if (parsed.unit === "px") {
    return parsed.numericValue;
  }

  return (parsed.numericValue / 100) * viewportDimension;
};

export const getResolvedSceneDimensions = (
  sceneProperties: { viewWidth?: string; viewHeight?: string },
  viewportWidth: number,
  viewportHeight: number,
): { width: number; height: number } => ({
  width: resolveViewDimensionToPx(sceneProperties.viewWidth, viewportWidth),
  height: resolveViewDimensionToPx(sceneProperties.viewHeight, viewportHeight),
});
