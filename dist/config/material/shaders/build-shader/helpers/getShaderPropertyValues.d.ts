import { ShaderPropertyTypes } from "../constants/buildShader.consts";
import { ShaderPropertyConfig } from "../types";
interface CustomProperties {
    [key: string]: {
        value: unknown;
    } | {
        value: unknown;
    }[];
}
export declare const setUpCustomPropertyValues: (config: ShaderPropertyConfig[], propertyType: ShaderPropertyTypes) => {
    customProperties: CustomProperties;
    customStrings: string[];
};
export {};
