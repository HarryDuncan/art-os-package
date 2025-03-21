export declare enum ShaderPropertyValueTypes {
    INT = "INT",
    FLOAT = "FLOAT",
    BOOL = "BOOL",
    VEC2 = "VEC2",
    VEC3 = "VEC3",
    VEC4 = "VEC4",
    MAT2 = "MAT2",
    MAT3 = "MAT3",
    MAT4 = "MAT4",
    SAMPLER2D = "SAMPLER2D",
    SAMPLER_CUBE = "SAMPLER_CUBE",
    VOID = "VOID",
    CONST = "CONST",
    STRUCT = "STRUCT"
}
export declare enum ShaderPropertyTypes {
    UNIFORM = "UNIFORM",
    VARYING = "VARYING",
    ATTRIBUTE = "ATTRIBUTE"
}
export declare const MAIN_START = "void main() { ";
export declare const VERTEX_POINT_INSTANTIATION: string;
export declare const VERTEX_NORMAL_INSTANTIATION: string;
export declare const MAIN_END = "}";
export declare const FRAG_COLOR_INSTANTIATION: string;
export declare const POINT_PARENTS: {
    INTERACTIVE: string;
    TRIGGERED: string;
    IMAGE_EFFECT: string;
    TRANSITION: string;
    MORPH_TRANSITION: string;
};
