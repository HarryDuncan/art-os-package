import { ColorFragmentEffectProps } from "../../../types";
import { createColorVectorString } from "../../../helpers/createColorVectorString";

export const colorTransformation = (
  colorName: string,
  effectProps: ColorFragmentEffectProps
) => {
  const colorAsVector = createColorVectorString(
    effectProps.color,
    !!effectProps.opacity
  );
  return `
        vec4 ${colorName} = ${colorAsVector};
        `;
};
