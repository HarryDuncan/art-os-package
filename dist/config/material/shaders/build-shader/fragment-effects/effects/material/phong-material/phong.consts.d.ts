import { ShaderPropertyValueTypes } from "../../../../constants";
import { VaryingConfig } from "../../../../types";
export declare const DEFAULT_PHONG_UNIFORMS: {
    defaultUniforms: ("uPosition" | "uResolution" | "uMaterial" | "uOpacity" | "uProgress" | "uBrightness" | "uStrength" | "uLoopCount" | "uCenter" | "uIsTriggered" | "uTextureSize")[];
    customUniforms: ({
        id: string;
        valueType: ShaderPropertyValueTypes;
        value: any;
        tag?: undefined;
    } | {
        id: string;
        tag: string[];
        valueType: ShaderPropertyValueTypes;
        value: any;
    })[];
};
export declare const DEFAULT_PHONG_EFFECT_PROPS: {
    DEFAULT_PHONG_UNIFORMS: {
        defaultUniforms: ("uPosition" | "uResolution" | "uMaterial" | "uOpacity" | "uProgress" | "uBrightness" | "uStrength" | "uLoopCount" | "uCenter" | "uIsTriggered" | "uTextureSize")[];
        customUniforms: ({
            id: string;
            valueType: ShaderPropertyValueTypes;
            value: any;
            tag?: undefined;
        } | {
            id: string;
            tag: string[];
            valueType: ShaderPropertyValueTypes;
            value: any;
        })[];
    };
};
export declare const PHONG_REQUIRED_FUNCTIONS: any[];
export declare const PHONG_VARYINGS: VaryingConfig[];
