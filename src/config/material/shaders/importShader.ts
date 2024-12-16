/* eslint import/namespace: ['error', { allowComputed: true }] */

import { MaterialUniform } from "../materials.types";

export const importShader = (
  shaderId: string,
  vertexShaderId: string | undefined,
  fragmentShaderId: string | undefined
): {
  fragmentShader: string;
  vertexShader: string;
  setUpDefaultUniforms: ((uniforms: MaterialUniform) => MaterialUniform) | null;
} => {
  try {
    const {
      fragmentShader: defaultFragmentShader,
      vertexShader,
      defaultUniforms: setUpDefaultUniforms,
      // @ts-ignore - not ideal but will replace with build shader
    } = Shaders[shaderId];
    if (vertexShaderId) {
      // todo -import vertex shader
    }
    const fragmentShader = getFragmentShader(
      defaultFragmentShader,
      fragmentShaderId
    );
    return { fragmentShader, vertexShader, setUpDefaultUniforms };
  } catch {
    console.error(`${shaderId} not a valid shader`);
    return { fragmentShader: "", vertexShader: "", setUpDefaultUniforms: null };
  }
};

const getFragmentShader = (
  defaultFragmentShader: string,
  fragmentShaderId: string | undefined
) => {
  if (fragmentShaderId) {
    // @ts-ignore - not ideal but will replace with build shader
    const { fragmentShader } = Shaders[fragmentShaderId];
    return fragmentShader;
  }
  return defaultFragmentShader;
};
