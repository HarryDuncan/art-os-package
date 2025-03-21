import { RotationEffectProps } from "../../../types";
export declare const rotationTransform: (rotationEffect: RotationEffectProps) => {
    uniformConfig: import("../../../types").UniformConfig | {
        customUniforms: ({
            id: string;
            valueType: import("../../../constants").ShaderPropertyValueTypes;
        } | {
            value: number;
            id: string;
            valueType: import("../../../constants").ShaderPropertyValueTypes;
        })[];
        defaultUniforms: any[];
    };
    requiredFunctions: import("../../../types").ShaderFunction[] | {
        id: string;
        functionDefinition: string;
    }[];
    transformation: string;
};
