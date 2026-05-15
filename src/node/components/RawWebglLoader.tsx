import { SceneConfig } from "../../config/config.types";
import { RawWebglSceneNode } from "./RawWebglSceneNode";

// TODO: Skeleton loader for the `webgl` engine. Mirrors `ThreeJsLoader` in
// ProgressiveLoading.tsx but builds a raw WebGL pipeline instead of the
// three.js one. Fill out the stages below as the raw WebGL runtime lands.
export const RawWebglLoader = ({
  sceneConfig,
}: {
  sceneConfig: SceneConfig;
}) => {
  // TODO: Initialize raw WebGL assets (textures, buffers, shader sources)
  //       from `sceneConfig.assets` / `sceneConfig.assetPath`. Likely a
  //       `useRawWebglAssets` hook, parallel to `useAssets`.

  // TODO: Initialize a raw WebGL camera/projection abstraction from
  //       `sceneConfig.cameraConfig`, parallel to `useCamera` for three.js.

  // TODO: Gate rendering on an `areAssetsInitialized`-style flag exposed by
  //       the scene context once raw WebGL asset loading exists.

  // TODO: Build raw WebGL "scene data" (program, attribute/uniform layouts,
  //       draw lists) from the config, parallel to `useSceneData`.

  // TODO: Wire interaction / peripheral configs into the raw WebGL runtime
  //       (see `useSetInteractionConfigs` / `useSetPeripheralConfigs`).

  return <RawWebglSceneNode sceneConfig={sceneConfig} />;
};
