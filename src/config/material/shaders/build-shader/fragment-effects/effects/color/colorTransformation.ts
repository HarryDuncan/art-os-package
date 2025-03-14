import { ColorFragmentEffectProps } from "../../../types";
import { createColorVectorString } from "../../../helpers/createColorVectorString";
import { FRAG_COLOR_NAME } from "../../fragmentEffects.consts";

export const colorTransformation = (effectProps: ColorFragmentEffectProps) => {
  const colorAsVector = createColorVectorString(
    effectProps.color,
    !!effectProps.opacity
  );
  return `
       ${FRAG_COLOR_NAME} = ${colorAsVector};
        `;
};
