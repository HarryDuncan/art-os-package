import { ShaderPropertyValueTypes } from "../../../../constants";
import { VaryingConfig } from "../../../../types";
export declare const DEFAULT_MATCAP_UNIFORMS: {
    defaultUniforms: ("uPosition" | "uResolution" | "uMaterial" | "uOpacity" | "uProgress" | "uBrightness" | "uStrength" | "uLoopCount" | "uCenter" | "uIsTriggered" | "uTextureSize")[];
    customUniforms: {
        id: string;
        valueType: ShaderPropertyValueTypes;
    }[];
};
export declare const DEFAULT_MATCAP_EFFECT_PROPS: {};
export declare const MATCAP_REQUIRED_FUNCTIONS: {
    id: string;
    functionDefinition: string;
}[];
export declare const MATCAP_VARYINGS: VaryingConfig[];
