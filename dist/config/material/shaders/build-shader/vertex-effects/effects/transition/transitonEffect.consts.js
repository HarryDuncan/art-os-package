import { POINT_PARENTS } from "../../../constants/buildShader.consts";
export const TRANSITION_UNIFORM_CONFIG = {
    defaultUniforms: [""],
    customUniforms: [],
};
export const TRANSITION_VARYING_CONFIG = [
    {
        id: "vTransition",
        valueType: "FLOAT",
        varyingType: "CUSTOM",
        value: "isTransition",
    },
];
export const DEFAULT_TRANSITION_EFFECT = {
    declareInTransform: false,
    pointParent: POINT_PARENTS.TRANSITION,
    effectType: "",
};
