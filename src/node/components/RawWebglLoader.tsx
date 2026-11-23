import { useMemo } from "react";
import { SceneConfig } from "../../config/config.types";
import { RawWebglSceneNode } from "./RawWebglSceneNode";
import { useRawWebglAssets } from "../../assets/raw-webgl/useRawWebglAssets";
import { useSceneContext } from "../../context/context";
import { generateRawWebglShaderMaterials } from "../../config/material/shaders/raw-webgl/generateRawWebglShaderMaterials";
import { formatSceneProperties } from "../../config/scene-properties/formatSceneProperties";
import {
  hasResolvedSceneBackground,
} from "../../config/scene-properties/backgroundUtils";
import { RawWebglRendererScene } from "./raw-webgl/useRawWebglRenderer";

import { packageConsole } from "../../utils/packageConsole";
// Loader for the `webgl` engine. Mirrors `ThreeJsLoader` in
// ProgressiveLoading.tsx but builds a raw WebGL pipeline instead of the
// three.js one.
export const RawWebglLoader = ({
  sceneConfig,
}: {
  sceneConfig: SceneConfig;
}) => {
  const { areAssetsInitialized, assetsRef } = useSceneContext();
  useRawWebglAssets(sceneConfig.assets, sceneConfig.assetPath);

  // TODO: Wire interaction / peripheral configs into the raw WebGL runtime
  //       (see `useSetInteractionConfigs` / `useSetPeripheralConfigs`).

  const assets = areAssetsInitialized ? assetsRef.current : null;

  // Memoized so the scene's identity is stable across re-renders (e.g. the
  // context update fired by the renderer's `setStatus(RUNNING)`). A new
  // object here tears down and rebuilds every WebGL program, buffer and
  // texture in `useRawWebglRenderer`.
  const scene = useMemo((): RawWebglRendererScene | null => {
    if (!assets) return null;
    const { builtShaders } = generateRawWebglShaderMaterials(
      sceneConfig,
      assets,
    );
    return {
      shaderMaterials: builtShaders,
      assets,
      meshComponentConfigs: sceneConfig.meshComponentConfigs,
      meshTransforms: sceneConfig.meshTransforms,
      cameraConfig: sceneConfig.cameraConfig,
      legacyConfig: sceneConfig.rawWebglConfig,
    };
  }, [sceneConfig, assets]);

  // Formats scene properties for runtime (normalizes background to color).
  // Memoized to keep `RawWebglSceneNode`'s memo() intact.
  const sceneProperties = useMemo(() => {
    if (!assets) return null;
    return formatSceneProperties(sceneConfig.sceneProperties, assets);
  }, [sceneConfig.sceneProperties, assets]);

  if (!assets) return null;

  // A scene with no shader is valid as long as it has a background to show, so
  // only flag the case where there is nothing at all to draw.
  const hasBackground = hasResolvedSceneBackground(sceneProperties?.background);
  if (!scene?.shaderMaterials.length && !hasBackground) {
    packageConsole.warn(
      "RawWebglLoader: no built shader materials and no scene background; nothing to render",
    );
  }

  return (
    <RawWebglSceneNode
      scene={scene}
      sceneProperties={sceneProperties}
      clearColor={sceneConfig.rawWebglConfig?.clearColor}
    />
  );
};
