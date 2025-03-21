export declare const DEFAULT_LIGHT_INTENSITY = 1;
export declare const DEFAULT_LIGHTS: ({
    name: string;
    lightType: "AMBIENT" | "POINT_LIGHT" | "DIRECTIONAL_LIGHT";
    props: {
        intensity: number;
        color?: undefined;
    };
} | {
    name: string;
    lightType: "AMBIENT" | "POINT_LIGHT" | "DIRECTIONAL_LIGHT";
    props: {
        color: string;
        intensity?: undefined;
    };
})[];
