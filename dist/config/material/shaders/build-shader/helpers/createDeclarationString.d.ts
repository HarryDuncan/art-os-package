import { ShaderPropertyTypes, ShaderPropertyValueTypes } from "../constants/buildShader.consts";
import { StructConfig } from "../types";
export declare const createDeclarationString: (propertyType: ShaderPropertyTypes, valueType: ShaderPropertyValueTypes, id: string, arrayLength?: number, structProperties?: StructConfig) => string;
