import {
  DistortionEffectProps,
  ExpandEffectProps,
  ExplodeEffectProps,
  ImageVertexEffect,
  InteractiveEffectProps,
  MorphEffectProps,
  NoiseEffectProps,
  PointsEffectProps,
  RotationEffectProps,
  TriggeredVertexEffect,
  VertexEffectConfig,
} from "../../types";
import { VERTEX_EFFECTS } from "../vertexEffects.consts";
import { VertexEffectData } from "../vertexEffects.types";
import { cloudEffect } from "./displacement/cloud/cloudTransform";
import { distortionEffect } from "./displacement/distort/distortionEffect";
import { expand } from "./displacement/expand/expand";
import { explode } from "./displacement/explode/explode";
import { noise } from "./displacement/noise/noise";
import { traverseTransform } from "./displacement/traverse/traverseTransform";
import { vertexFilter } from "./filter-vertex/filterVertex";
import { imageVertexEffect } from "./image-vertex-effects/imageVertexEffect";
import { interactiveEffect } from "./interactive/interactiveEffect";
import { morphVertex } from "./morph/morphVertex";
import { pointsVertex } from "./points/pointsVertex";
import { rotationEffect } from "./rotation/rotation";
import { triggeredEffect } from "./triggered-effect/triggeredEffect";

export const getVertexEffect = (
  effect: VertexEffectConfig
): VertexEffectData => {
  const { effectType, effectProps } = effect;
  switch (effectType) {
    case VERTEX_EFFECTS.EXPLODE: {
      return explode(effectProps as Partial<ExplodeEffectProps>);
    }
    case VERTEX_EFFECTS.FILTER: {
      return vertexFilter();
    }
    case VERTEX_EFFECTS.POINTS: {
      return pointsVertex(
        effectProps as Partial<PointsEffectProps> | undefined
      );
    }
    case VERTEX_EFFECTS.CLOUD: {
      return cloudEffect();
    }
    case VERTEX_EFFECTS.MORPH: {
      return morphVertex(effectProps as Partial<MorphEffectProps> | undefined);
    }
    case VERTEX_EFFECTS.TRAVERSE: {
      return traverseTransform();
    }
    case VERTEX_EFFECTS.DISTORT: {
      return distortionEffect(effectProps as DistortionEffectProps);
    }
    case VERTEX_EFFECTS.INTERACTIVE: {
      return interactiveEffect(effectProps as InteractiveEffectProps);
    }
    case VERTEX_EFFECTS.EXPAND: {
      return expand(effectProps as ExpandEffectProps);
    }
    case VERTEX_EFFECTS.NOISE: {
      return noise(effectProps as NoiseEffectProps);
    }
    case VERTEX_EFFECTS.ROTATE: {
      return rotationEffect(effectProps as RotationEffectProps);
    }
    case VERTEX_EFFECTS.TRIGGERED_EFFECT: {
      return triggeredEffect(effectProps as TriggeredVertexEffect);
    }
    case VERTEX_EFFECTS.VERTEX_IMAGE_EFFECT: {
      return imageVertexEffect(effectProps as ImageVertexEffect);
    }
    default:
      console.warn(
        `no vertex transformations configured for ${String(effectType)}`
      );
      return {
        attributeConfig: [],
        requiredFunctions: [],
        uniformConfig: { defaultUniforms: [] },
        transformation: "",
        varyingConfig: [],
      };
  }
};
