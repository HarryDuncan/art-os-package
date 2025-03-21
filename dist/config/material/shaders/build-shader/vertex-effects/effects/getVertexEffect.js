import { VERTEX_EFFECTS } from "../vertexEffects.consts";
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
export const getVertexEffect = (effect) => {
    const { effectType, effectProps } = effect;
    switch (effectType) {
        case VERTEX_EFFECTS.EXPLODE: {
            return explode(effectProps);
        }
        case VERTEX_EFFECTS.FILTER: {
            return vertexFilter();
        }
        case VERTEX_EFFECTS.POINTS: {
            return pointsVertex(effectProps);
        }
        case VERTEX_EFFECTS.CLOUD: {
            return cloudEffect();
        }
        case VERTEX_EFFECTS.MORPH: {
            return morphVertex(effectProps);
        }
        case VERTEX_EFFECTS.TRAVERSE: {
            return traverseTransform();
        }
        case VERTEX_EFFECTS.DISTORT: {
            return distortionEffect(effectProps);
        }
        case VERTEX_EFFECTS.INTERACTIVE: {
            return interactiveEffect(effectProps);
        }
        case VERTEX_EFFECTS.EXPAND: {
            return expand(effectProps);
        }
        case VERTEX_EFFECTS.NOISE: {
            return noise(effectProps);
        }
        case VERTEX_EFFECTS.ROTATE: {
            return rotationEffect(effectProps);
        }
        case VERTEX_EFFECTS.TRIGGERED_EFFECT: {
            return triggeredEffect(effectProps);
        }
        case VERTEX_EFFECTS.VERTEX_IMAGE_EFFECT: {
            return imageVertexEffect(effectProps);
        }
        default:
            console.warn(`no vertex transformations configured for ${String(effectType)}`);
            return {
                attributeConfig: [],
                requiredFunctions: [],
                uniformConfig: { defaultUniforms: [] },
                transformation: "",
                varyingConfig: [],
            };
    }
};
