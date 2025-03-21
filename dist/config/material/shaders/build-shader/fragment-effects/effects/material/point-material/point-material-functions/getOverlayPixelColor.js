import { FRAG_COLOR_NAME } from "../../../../fragmentEffects.consts";
export const getOverlayPixelColor = (pointEffectProps) => {
    const transformation = `${FRAG_COLOR_NAME} = vOverlayPixelColor ;`;
    return {
        transformation,
    };
};
