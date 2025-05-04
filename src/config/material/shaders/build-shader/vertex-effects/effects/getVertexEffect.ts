import {
  VertexEffectConfig,
  UniformConfig,
} from "../../../../../../types/materials/shaders/buildShader.types";
import {
  ExplodeEffectProps,
  PointsEffectProps,
  MorphEffectProps,
  DistortionEffectProps,
  ExpandEffectProps,
  NoiseEffectProps,
  RotationEffectProps,
  ImageVertexEffect,
  ImageToPointsEffectProps,
  ImageAsMaskEffectProps,
} from "../../../../../../types/materials/shaders/vertexShader.types";
import { VERTEX_EFFECTS } from "../../../../../../consts/materials/vertexEffects.consts";
import { VertexEffectData } from "../vertexEffects.types";
import { cloudEffect } from "./displacement/cloud/cloudTransform";
import { distortionEffect } from "./displacement/distort/distortionEffect";
import { expand } from "./displacement/expand/expand";
import { explode } from "./displacement/explode/explode";
import { noise } from "./displacement/noise/noise";
import { traverseTransform } from "./displacement/traverse/traverseTransform";
import { vertexFilter } from "./filter-vertex/filterVertex";

import { morphVertex } from "./morph/morphVertex";
import { pointsVertex } from "./points/pointsVertex";
import { rotationEffect } from "./rotation/rotation";
import { formatUniformsForEffect } from "../../helpers/formatUniformsForEffect";
import { imageToPoints } from "./image-vertex-effects/image-to-points/imageToPoints";
import { imageAsMask } from "./image-vertex-effects/image-as-mask/imageAsMask";

export const getVertexEffect = (
  effect: VertexEffectConfig,
  uniformConfig: UniformConfig
): VertexEffectData => {
  const { effectType, effectProps, id } = effect;
  const effectUniforms = formatUniformsForEffect(uniformConfig, id);
  console.log(effectUniforms);
  switch (effectType) {
    case VERTEX_EFFECTS.EXPLODE: {
      return explode(
        effectProps as Partial<ExplodeEffectProps>,
        effectUniforms
      );
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
    case VERTEX_EFFECTS.EXPAND: {
      return expand(effectProps as ExpandEffectProps);
    }
    case VERTEX_EFFECTS.NOISE: {
      return noise(effectProps as NoiseEffectProps);
    }
    case VERTEX_EFFECTS.ROTATE: {
      return rotationEffect(effectProps as RotationEffectProps);
    }
    case VERTEX_EFFECTS.IMAGE_TO_POINTS: {
      return imageToPoints(
        effectProps as ImageToPointsEffectProps,
        effectUniforms
      );
    }
    case VERTEX_EFFECTS.IMAGE_AS_MASK: {
      return imageAsMask(effectProps as ImageAsMaskEffectProps, effectUniforms);
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
