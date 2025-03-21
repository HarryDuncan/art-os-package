import { PointLightConfig } from "../lights.types";
interface PointLightParameters extends PointLightConfig {
    name: string;
}
export declare const PointLightElement: ({ name, color, intensity, position, }: PointLightParameters) => any;
export {};
