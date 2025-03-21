import { POINT_PARENTS } from "../../../constants/buildShader.consts";
import { TRIGGERED_FRAGMENT_EFFECT } from "../../fragmentEffects.consts";
export const TRIGGERED_UNIFORM_CONFIG = {
    defaultUniforms: ["uIsTriggered"],
    customUniforms: [],
};
export const TRIGGERED_VARYING_CONFIG = [
    {
        id: "vTriggered",
        valueType: "FLOAT",
        varyingType: "CUSTOM",
        value: "isTriggered",
    },
];
export const TRIGGERED_FUNCTIONS = [];
export const TRIGGERED_ATTRIBUTE_CONFIGS = [];
export const DEFAULT_TRIGGERED_EFFECT = {
    declareInTransform: false,
    pointParent: POINT_PARENTS.TRIGGERED,
    effectType: TRIGGERED_FRAGMENT_EFFECT.EMPTY,
    effectProps: {},
};
