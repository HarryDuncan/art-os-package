import { DirectionalLightConfig } from "../lights.types";
interface DirectionalLightParameters extends DirectionalLightConfig {
    name: string;
}
export declare const DirectionalLightElement: ({ name, color, position, }: DirectionalLightParameters) => any;
export {};
