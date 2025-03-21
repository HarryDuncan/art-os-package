import { ShaderPropertyValueTypes } from "../../../../constants";
import { VaryingConfig } from "../../../../types";
export declare const DEFAULT_POINT_MATERIAL_PROPS: {
    pointDisplayPercentage: number;
    pointTextures: {
        id: string;
        pointColor: string;
    }[];
    pointColor: string;
};
export declare const POINT_MATERIAL_VARYINGS: VaryingConfig[];
export declare const POINT_MATERIAL_FUNCTIONS: any[];
export declare const POINT_MATERIAL_ATTRIBUTES: {
    id: string;
    valueType: ShaderPropertyValueTypes;
}[];
export declare const POINT_MATERIAL_UNIFORMS: {
    defaultUniforms: string[];
    customUniforms: any[];
};
export declare const EXTERNAL_POINT_COLOR_EFFECTS: string[];
