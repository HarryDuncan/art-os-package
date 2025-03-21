import { DEFAULT_FRAG_COLOR, FRAG_COLOR_NAME, } from "../../../../fragmentEffects.consts";
import { createColorVectorString } from "../../../../../helpers/createColorVectorString";
export const getPointColor = (defaultColor) => {
    const defaultColorVector = createColorVectorString(defaultColor !== null && defaultColor !== void 0 ? defaultColor : DEFAULT_FRAG_COLOR, true);
    return `${FRAG_COLOR_NAME} =  ${defaultColorVector};`;
};
