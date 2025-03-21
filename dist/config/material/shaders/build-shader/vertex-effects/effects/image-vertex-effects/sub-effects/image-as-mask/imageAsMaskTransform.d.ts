import { ShaderPropertyValueTypes } from "../../../../../constants";
import { AttributeConfig, ImageAsMaskEffectProps } from "../../../../../types";
export declare const imageAsMaskTransform: (imageVertexEffectProps: ImageAsMaskEffectProps) => {
    transformation: string;
    effectUniforms: {
        defaultUniforms: any[];
        customUniforms: any[];
    };
    effectVaryings: ({
        id: string;
        varyingType: string;
        attributeKey: string;
        valueType: ShaderPropertyValueTypes;
        value?: undefined;
    } | {
        id: string;
        varyingType: string;
        valueType: ShaderPropertyValueTypes;
        attributeKey?: undefined;
        value?: undefined;
    } | {
        id: string;
        varyingType: string;
        valueType: ShaderPropertyValueTypes;
        value: string;
        attributeKey?: undefined;
    })[];
    effectFunctions: {
        id: string;
        functionDefinition: string;
    }[];
    effectAttributes: AttributeConfig[];
};
