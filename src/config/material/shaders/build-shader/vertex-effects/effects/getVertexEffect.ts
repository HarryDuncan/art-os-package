import {
  VertexEffectConfig,
  UniformConfig,
  VaryingConfig,
} from "../../../../../../types/materials/index";
import {
  PointsEffectProps,
  MorphEffectProps,
  DistortionEffectProps,
  ExpandEffectProps,
  NoiseEffectProps,
  RotationEffectProps,
  ImageToPointsEffectProps,
  ImageAsMaskEffectProps,
} from "../vertexShader.types";
import { VERTEX_EFFECTS } from "../vertexEffects.consts";
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
import { interactionBased } from "./interaction-based/interactionBased";
import { formatVaryingsForEffect } from "../../helpers/formatVaryingsForEffect";

export const getVertexEffect = (
  effect: VertexEffectConfig,
  uniformConfig: UniformConfig,
  varyingConfig: VaryingConfig[]
): VertexEffectData => {
  const { effectType, effectProps, id } = effect;
  const effectUniforms = formatUniformsForEffect(uniformConfig, id);
  const effectVaryings = formatVaryingsForEffect(varyingConfig, id);
  switch (effectType) {
    case VERTEX_EFFECTS.EXPLODE: {
      return explode(effectUniforms);
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
    case VERTEX_EFFECTS.AFFECTED_POSITION: {
      console.log("effect", effect);
      return interactionBased(
        effectType,
        effectUniforms,
        effectVaryings,
        effect?.subEffects ?? [],
        uniformConfig,
        varyingConfig
      );
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
