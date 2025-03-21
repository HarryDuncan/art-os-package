import { FRAG_COLOR_NAME } from "../../../../fragmentEffects.consts";
export const getTexturePixelColor = (pointEffectProps) => {
    const transformation = `${FRAG_COLOR_NAME} = vPixelColor;`;
    return {
        transformation,
    };
};
