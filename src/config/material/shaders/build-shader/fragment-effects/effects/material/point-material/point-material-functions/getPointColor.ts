import { DEFAULT_FRAG_COLOR } from "../../../../fragmentEffects.consts";
import { createColorVectorString } from "../../../../../helpers/createColorVectorString";

export const getPointColor = (
  fragName: string,
  defaultColor: string | undefined
) => {
  const defaultColorVector = createColorVectorString(
    defaultColor ?? DEFAULT_FRAG_COLOR,
    true
  );
  return `vec4 pointColor_${fragName} =  ${defaultColorVector};`;
};
