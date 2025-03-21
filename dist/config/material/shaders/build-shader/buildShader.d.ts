import { AttributeConfig, BuiltShaderConfig, ShaderFunction } from "./types";
export declare const buildShader: (shaderConfig: BuiltShaderConfig) => {
    vertexShader: string;
    fragmentShader: string;
    uniforms: {
        [x: string]: {
            value: unknown;
        } | {
            value: unknown;
        }[] | {
            value: unknown;
        } | {
            value: unknown;
        }[];
    };
    attributeConfigs: AttributeConfig[];
};
export declare const formatFragmentShader: (structDeclaration: string, uniformDeclaration: string, varyingDeclaration: string, fragmentFunctions: ShaderFunction[], fragmentTransformations: string, fragColor: string) => string;
