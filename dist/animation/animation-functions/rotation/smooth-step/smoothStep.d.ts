export type SmoothStepHelper = {
    stepSize: number;
    isRunningSteps: boolean;
    stepTo: number;
    currentStep: number | null;
};
export declare const DEFAULT_SMOOTH_STEP_HELPER: {
    stepSize: number;
    isRunningSteps: boolean;
    stepTo: number;
    currentStep: any;
};
export declare const smoothStepTo: (smoothStep: SmoothStepHelper) => number;
