import { AmbientLightConfig } from "../lights.types";
export interface AmbientLightParameters extends AmbientLightConfig {
    name: string;
}
export declare const AmbientLightElement: ({ name, color, intensity, }: AmbientLightParameters) => any;
