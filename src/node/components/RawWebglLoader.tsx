import { useMemo } from "react";
import { SceneConfig } from "../../config/config.types";
import { RawWebglSceneNode } from "./RawWebglSceneNode";
import { useRawWebglAssets } from "../../assets/raw-webgl/useRawWebglAssets";
import { useSceneContext } from "../../context/context";
import { generateRawWebglShaderMaterials } from "../../config/material/shaders/raw-webgl/generateRawWebglShaderMaterials";

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

  if (!assets) return null;
  if (!shaderMaterial) {
    console.warn(
      "RawWebglLoader: no built shader at sceneMaterialConfigs[0]; nothing to render",
    );
    return null;
  }

  return <RawWebglSceneNode shaderMaterial={shaderMaterial} assets={assets} />;
};
