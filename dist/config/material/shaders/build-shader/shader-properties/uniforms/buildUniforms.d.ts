import { UniformConfig } from "../../types";
export declare const buildUniforms: (uniformConfig: UniformConfig) => {
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
    uniformDeclaration: string;
};
