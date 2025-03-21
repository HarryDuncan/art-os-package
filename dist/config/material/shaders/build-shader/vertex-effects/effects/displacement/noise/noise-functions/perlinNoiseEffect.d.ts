export declare const perlinNoiseEffect: () => {
    transform: string;
    requiredFunctions: {
        id: string;
        functionDefinition: string;
    }[];
    uniformConfig: {
        defaultUniforms: any[];
        customUniforms: {
            id: string;
            valueType: string;
            value: number;
        }[];
    };
};
