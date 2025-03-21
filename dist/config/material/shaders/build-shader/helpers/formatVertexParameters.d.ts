import { VertexEffectProps } from "../types";
export declare const formatVertexParameters: (parsedEffectProps: Partial<VertexEffectProps>, defaultEffectProps: VertexEffectProps) => {
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    declareInTransform: boolean;
} | {
    props?: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    maxEffectStrength?: number;
    multiplier?: number;
    declareInTransform: boolean;
} | {
    noiseType?: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength?: number;
    declareInTransform: boolean;
} | {
    effectType?: string;
    speed?: number;
    degrees?: number;
    axis?: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    morphCount?: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs?: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    pointSize?: number;
    perspectiveConfig?: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType?: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps?: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    effectType?: "DISPLACE" | "WARP";
    effectProps?: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
    declareInTransform: boolean;
} | {
    props?: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
    declareInTransform: boolean;
} | {
    noiseType?: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
    effectDistanceMinLength: number;
    maxEffectStrength: number;
    multiplier: number;
    declareInTransform: boolean;
} | {
    effectType?: string;
    speed?: number;
    degrees?: number;
    axis?: "X" | "Y" | "Z";
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
    declareInTransform: boolean;
} | {
    morphCount?: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs?: import("../types").PreTransformConfig[];
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
    declareInTransform: boolean;
} | {
    pointSize?: number;
    perspectiveConfig?: import("../types").PointPerspectiveConfig;
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType?: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps?: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
} | {
    effectType?: "DISPLACE" | "WARP";
    effectProps?: import("../types").TriggeredVertexEffectProps;
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength: number;
    multiplier: number;
    declareInTransform: boolean;
} | {
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength: number;
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    declareInTransform: boolean;
} | {
    props?: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength: number;
    maxEffectStrength?: number;
    multiplier?: number;
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    declareInTransform: boolean;
} | {
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
    declareInTransform: boolean;
} | {
    effectType?: string;
    speed?: number;
    degrees?: number;
    axis?: "X" | "Y" | "Z";
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
    declareInTransform: boolean;
} | {
    morphCount?: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs?: import("../types").PreTransformConfig[];
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
    declareInTransform: boolean;
} | {
    pointSize?: number;
    perspectiveConfig?: import("../types").PointPerspectiveConfig;
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType?: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps?: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
} | {
    effectType?: "DISPLACE" | "WARP";
    effectProps?: import("../types").TriggeredVertexEffectProps;
    noiseType: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
    declareInTransform: boolean;
} | {
    effectType?: string;
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    effectType?: string;
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    props?: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    effectType?: string;
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    maxEffectStrength?: number;
    multiplier?: number;
    effectType?: string;
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    noiseType?: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength?: number;
    effectType?: string;
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    effectType?: string;
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    morphCount?: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs?: import("../types").PreTransformConfig[];
    effectType?: string;
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    pointSize?: number;
    perspectiveConfig?: import("../types").PointPerspectiveConfig;
    effectType?: string;
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType?: string;
    effectProps?: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
} | {
    effectType?: string;
    effectProps?: import("../types").TriggeredVertexEffectProps;
    speed: number;
    degrees?: number;
    axis: "X" | "Y" | "Z";
    declareInTransform: boolean;
} | {
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    props?: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    maxEffectStrength?: number;
    multiplier?: number;
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    noiseType?: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength?: number;
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    effectType?: string;
    speed?: number;
    degrees?: number;
    axis?: "X" | "Y" | "Z";
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    pointSize?: number;
    perspectiveConfig?: import("../types").PointPerspectiveConfig;
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType?: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps?: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
} | {
    effectType?: "DISPLACE" | "WARP";
    effectProps?: import("../types").TriggeredVertexEffectProps;
    morphCount: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
} | {
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    props?: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    maxEffectStrength?: number;
    multiplier?: number;
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    noiseType?: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength?: number;
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    effectType?: string;
    speed?: number;
    degrees?: number;
    axis?: "X" | "Y" | "Z";
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    morphCount?: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs?: import("../types").PreTransformConfig[];
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType?: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps?: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
} | {
    effectType?: "DISPLACE" | "WARP";
    effectProps?: import("../types").TriggeredVertexEffectProps;
    pointSize: number;
    perspectiveConfig: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    declareInTransform: boolean;
    effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    props?: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
    effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    maxEffectStrength?: number;
    multiplier?: number;
    declareInTransform: boolean;
    effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    noiseType?: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength?: number;
    declareInTransform: boolean;
    effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    effectType: string;
    speed?: number;
    degrees?: number;
    axis?: "X" | "Y" | "Z";
    declareInTransform: boolean;
    effectProps: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    morphCount?: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs?: import("../types").PreTransformConfig[];
    declareInTransform: boolean;
    effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    pointSize?: number;
    perspectiveConfig?: import("../types").PointPerspectiveConfig;
    declareInTransform: boolean;
    effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    declareInTransform: boolean;
    effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    effectType: "IMAGE_AS_MASK" | "DISPLACE" | "WARP" | "IMAGE_TO_POINTS";
    effectProps: {
        effectDistanceMinLength: number;
        effectStrength: number;
    } | import("../types").DisplacementEffectProps | {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
    declareInTransform: boolean;
} | {
    effectType: "DISPLACE" | "WARP";
    effectProps: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    effectType: "DISPLACE" | "WARP";
    effectProps: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    props?: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    effectType: "DISPLACE" | "WARP";
    effectProps: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    maxEffectStrength?: number;
    multiplier?: number;
    effectType: "DISPLACE" | "WARP";
    effectProps: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    noiseType?: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength?: number;
    effectType: "DISPLACE" | "WARP";
    effectProps: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    effectType: string;
    speed?: number;
    degrees?: number;
    axis?: "X" | "Y" | "Z";
    effectProps: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    morphCount?: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs?: import("../types").PreTransformConfig[];
    effectType: "DISPLACE" | "WARP";
    effectProps: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    pointSize?: number;
    perspectiveConfig?: import("../types").PointPerspectiveConfig;
    effectType: "DISPLACE" | "WARP";
    effectProps: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType: "IMAGE_AS_MASK" | "DISPLACE" | "WARP" | "IMAGE_TO_POINTS";
    effectProps: {
        effectDistanceMinLength: number;
        effectStrength: number;
    } | import("../types").DisplacementEffectProps | {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
} | {
    effectType: "DISPLACE" | "WARP";
    effectProps: import("../types").TriggeredVertexEffectProps;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength: number;
    effectStrength: number;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength: number;
    effectStrength: number;
    declareInTransform: boolean;
} | {
    props?: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    effectDistanceMinLength: number;
    effectStrength: number;
    declareInTransform: boolean;
} | {
    effectDistanceMinLength: number;
    effectStrength: number;
    maxEffectStrength?: number;
    multiplier?: number;
    declareInTransform: boolean;
} | {
    noiseType?: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength: number;
    effectDistanceMinLength: number;
    declareInTransform: boolean;
} | {
    effectType?: string;
    speed?: number;
    degrees?: number;
    axis?: "X" | "Y" | "Z";
    effectDistanceMinLength: number;
    effectStrength: number;
    declareInTransform: boolean;
} | {
    morphCount?: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs?: import("../types").PreTransformConfig[];
    effectDistanceMinLength: number;
    effectStrength: number;
    declareInTransform: boolean;
} | {
    pointSize?: number;
    perspectiveConfig?: import("../types").PointPerspectiveConfig;
    effectDistanceMinLength: number;
    effectStrength: number;
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType?: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps?: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
    effectDistanceMinLength: number;
    effectStrength: number;
} | {
    effectType?: "DISPLACE" | "WARP";
    effectProps?: import("../types").TriggeredVertexEffectProps;
    effectDistanceMinLength: number;
    effectStrength: number;
    declareInTransform: boolean;
} | {
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
} | {
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
} | {
    effectDistanceMinLength?: number;
    effectStrength?: number;
    maxEffectStrength?: number;
    multiplier?: number;
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
} | {
    noiseType?: "PERLIN" | "NORMAL" | "VORONOI";
    effectStrength?: number;
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
} | {
    effectType?: string;
    speed?: number;
    degrees?: number;
    axis?: "X" | "Y" | "Z";
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
} | {
    morphCount?: number;
    transitionConfig?: {
        noiseType: string;
        effectStrength: number;
        noiseUniformName: string;
    };
    preTransformConfigs?: import("../types").PreTransformConfig[];
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
} | {
    pointSize?: number;
    perspectiveConfig?: import("../types").PointPerspectiveConfig;
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
} | {
    declareInTransform: boolean;
    effectType?: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
    effectProps?: {
        effectType: "IMAGE_AS_MASK" | "IMAGE_TO_POINTS";
        effectProps: import("../types").ImageSubEffectProps;
    };
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
} | {
    effectType?: "DISPLACE" | "WARP";
    effectProps?: import("../types").TriggeredVertexEffectProps;
    props: {
        magnitude: {
            x: number;
            y: number;
            z: number;
        };
    };
    declareInTransform: boolean;
};
