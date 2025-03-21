import { PreTransformConfig } from "../../../types";
export declare const setUpMorphObjects: (morphCount: number, preTransformConfigs: PreTransformConfig[]) => {
    morphObjects: {
        pointName: string;
        normalName: string;
    }[];
    transforms: string[];
    requiredFunctions: import("../../../types").ShaderFunction[];
};
