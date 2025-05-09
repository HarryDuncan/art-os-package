import { ColorFragmentEffectProps } from "../../../../../../../types/materials/shaders/fragmentShader.types";
import { createColorVectorString } from "../../../helpers/createColorVectorString";
import { FRAG_COLOR_NAME } from "../../../../../../../consts";

export const colorTransformation = (effectProps: ColorFragmentEffectProps) => {
  const colorAsVector = createColorVectorString(
    effectProps.color,
    !!effectProps.opacity
  );
  return `
       ${FRAG_COLOR_NAME} = ${colorAsVector};
        `;
};
