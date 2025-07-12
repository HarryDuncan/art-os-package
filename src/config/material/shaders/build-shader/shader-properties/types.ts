import { SHADER_PROPERTY_VALUE_TYPES } from "../constants";

export type ShaderPropertyConfig = {
  id: string;
  guid?: string;
  name?: string;
  valueType: keyof typeof SHADER_PROPERTY_VALUE_TYPES;
  value?: unknown;
  arrayLength?: number;
  arrayValue?: unknown[];
};
