import { useMemo } from "react";
import { SceneConfig } from "../../config/config.types";
import { RawWebglSceneNode } from "./RawWebglSceneNode";
import { useRawWebglAssets } from "../../assets/raw-webgl/useRawWebglAssets";
import { useSceneContext } from "../../context/context";
import { generateRawWebglShaderMaterials } from "../../config/material/shaders/raw-webgl/generateRawWebglShaderMaterials";
import { formatSceneProperties } from "../../config/scene-properties/formatSceneProperties";

// Loader for the `webgl` engine. Mirrors `ThreeJsLoader` in
// ProgressiveLoading.tsx but builds a raw WebGL pipeline instead of the
// three.js one. Asset loading + shader-material generation are wired up;
// remaining stages are TODOs.
export const RawWebglLoader = ({
  sceneConfig,
}: {
  sceneConfig: SceneConfig;
}) => {
  const { areAssetsInitialized, assetsRef } = useSceneContext();
  useRawWebglAssets(sceneConfig.assets, sceneConfig.assetPath);

  // TODO: Initialize a raw WebGL camera/projection abstraction from
  //       `sceneConfig.cameraConfig`, parallel to `useCamera` for three.js.

  // TODO: Wire interaction / peripheral configs into the raw WebGL runtime
  //       (see `useSetInteractionConfigs` / `useSetPeripheralConfigs`).

  const assets = areAssetsInitialized ? assetsRef.current : null;

  // Memoize the generated shader material so its identity is stable across
  // re-renders (e.g. the context update fired by the renderer's
  // `setStatus(RUNNING)`). Without this, every re-render produces a new
  // `shaderMaterial` reference, which thrashes `useRawWebglRenderer`'s effect
  // — tearing down and rebuilding the WebGL program/buffers/textures every
  // frame and producing no visible output.
  const shaderMaterial = useMemo(() => {
    if (!assets) return null;
    const { builtShaders } = generateRawWebglShaderMaterials(
      sceneConfig,
      assets,
    );
    return builtShaders[0] ?? null;
  }, [sceneConfig, assets]);

  // Resolves asset-guid-valued properties (`videoBackground`, `backgroundUrl`)
  // to their file paths, same as the three.js path does via `useSceneData`.
  // Memoized to keep `RawWebglSceneNode`'s memo() intact.
  const sceneProperties = useMemo(() => {
    if (!assets) return null;
    return formatSceneProperties(sceneConfig.sceneProperties, assets);
  }, [sceneConfig.sceneProperties, assets]);

  if (!assets) return null;

  // A scene with no shader is valid as long as it has a background to show, so
  // only flag the case where there is nothing at all to draw.
  const hasBackground = !!(
    sceneProperties?.videoBackground || sceneProperties?.backgroundUrl
  );
  if (!shaderMaterial && !hasBackground) {
    console.warn(
      "RawWebglLoader: no built shader at sceneMaterialConfigs[0] and no scene background; nothing to render",
    );
  }

  return (
    <RawWebglSceneNode
      shaderMaterial={shaderMaterial}
      assets={assets}
      meshTransforms={sceneConfig.meshTransforms}
      sceneProperties={sceneProperties}
      clearColor={sceneConfig.rawWebglConfig?.clearColor}
    />
  );
};
