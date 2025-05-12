import {
  DEFAULT_FRAG_COLOR,
  FRAG_COLOR_NAME,
} from "../../../../../../../../../consts";
import { UniformValueConfig } from "../../../../../../../../../types";
import { createColorVectorString } from "../../../../../helpers/createColorVectorString";

export const getPointColor = (
  uniforms: UniformValueConfig[],
  _pointEffectProps: any
) => {
  const defaultColorVector = createColorVectorString(DEFAULT_FRAG_COLOR, true);
  return `${FRAG_COLOR_NAME} =  ${defaultColorVector};`;
};
