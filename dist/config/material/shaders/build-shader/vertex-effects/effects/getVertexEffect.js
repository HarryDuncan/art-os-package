"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVertexEffect = void 0;
const vertexEffects_consts_1 = require("../vertexEffects.consts");
const cloudTransform_1 = require("./displacement/cloud/cloudTransform");
const distortionEffect_1 = require("./displacement/distort/distortionEffect");
const expand_1 = require("./displacement/expand/expand");
const explode_1 = require("./displacement/explode/explode");
const noise_1 = require("./displacement/noise/noise");
const traverseTransform_1 = require("./displacement/traverse/traverseTransform");
const filterVertex_1 = require("./filter-vertex/filterVertex");
const imageVertexEffect_1 = require("./image-vertex-effects/imageVertexEffect");
const interactiveEffect_1 = require("./interactive/interactiveEffect");
const morphVertex_1 = require("./morph/morphVertex");
const pointsVertex_1 = require("./points/pointsVertex");
const rotation_1 = require("./rotation/rotation");
const triggeredEffect_1 = require("./triggered-effect/triggeredEffect");
const getVertexEffect = (effect) => {
    const { effectType, effectProps } = effect;
    switch (effectType) {
        case vertexEffects_consts_1.VERTEX_EFFECTS.EXPLODE: {
            return (0, explode_1.explode)(effectProps);
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.FILTER: {
            return (0, filterVertex_1.vertexFilter)();
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.POINTS: {
            return (0, pointsVertex_1.pointsVertex)(effectProps);
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.CLOUD: {
            return (0, cloudTransform_1.cloudEffect)();
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.MORPH: {
            return (0, morphVertex_1.morphVertex)(effectProps);
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.TRAVERSE: {
            return (0, traverseTransform_1.traverseTransform)();
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.DISTORT: {
            return (0, distortionEffect_1.distortionEffect)(effectProps);
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.INTERACTIVE: {
            return (0, interactiveEffect_1.interactiveEffect)(effectProps);
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.EXPAND: {
            return (0, expand_1.expand)(effectProps);
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.NOISE: {
            return (0, noise_1.noise)(effectProps);
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.ROTATE: {
            return (0, rotation_1.rotationEffect)(effectProps);
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.TRIGGERED_EFFECT: {
            return (0, triggeredEffect_1.triggeredEffect)(effectProps);
        }
        case vertexEffects_consts_1.VERTEX_EFFECTS.VERTEX_IMAGE_EFFECT: {
            return (0, imageVertexEffect_1.imageVertexEffect)(effectProps);
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
exports.getVertexEffect = getVertexEffect;
