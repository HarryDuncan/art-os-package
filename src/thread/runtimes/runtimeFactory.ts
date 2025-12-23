import { useStandardRuntime, StandardRuntimeConfig } from "./standard";
import {
  usePostEffectChainRuntime,
  PostEffectChainRuntimeConfig,
} from "./postEffectChainRuntime";
import { PingPongRenderTargetConfig } from "../../config/post-effects/findPostEffectTransforms";
import { useSceneContext } from "../../context/context";

export interface RuntimeFactoryConfig {
  postEffects: PingPongRenderTargetConfig[];
}

export const useRuntimeFactory = (config: RuntimeFactoryConfig) => {
  const { renderer, currentFrameRef } = useSceneContext();
  const { postEffects } = config;

  // If we have post effects, use the post effect runtime
  if (postEffects.length > 0) {
    const postEffectConfig: PostEffectChainRuntimeConfig = {
      currentFrameRef,
      renderer,
      postEffects,
    };

    return usePostEffectChainRuntime(postEffectConfig);
  }

  // Otherwise, use the standard runtime
  const standardConfig: StandardRuntimeConfig = {
    currentFrameRef,
    renderer,
  };

  return useStandardRuntime(standardConfig);
};
