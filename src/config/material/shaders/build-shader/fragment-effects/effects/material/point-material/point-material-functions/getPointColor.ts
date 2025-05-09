import {
  DEFAULT_FRAG_COLOR,
  FRAG_COLOR_NAME,
} from "../../../../../../../../../consts";
import { createColorVectorString } from "../../../../../helpers/createColorVectorString";

export const getPointColor = (defaultColor: string | undefined) => {
  const defaultColorVector = createColorVectorString(
    defaultColor ?? DEFAULT_FRAG_COLOR,
    true
  );
  return `${FRAG_COLOR_NAME} =  ${defaultColorVector};`;
};
