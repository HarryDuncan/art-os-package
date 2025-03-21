import { VertexEffectData } from "../vertex-effects/vertexEffects.types";
export declare const vertexEffectToEffectData: (effect: Partial<VertexEffectData> & {
    transformation: string;
}) => VertexEffectData;
