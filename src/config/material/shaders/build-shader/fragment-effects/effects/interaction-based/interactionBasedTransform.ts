import { UniformValueConfig } from "../../../buildShader.types";
import { FragmentEffectConfig } from "../../../buildShader.types";
import { UniformConfig } from "../../../buildShader.types";

export const interactionBasedTransform = (
  effectType: string,
  effectUniforms: UniformValueConfig[],
  unfilteredUniforms: UniformConfig,
  subEffects: FragmentEffectConfig[]
) => {
  const transformation = `
    

    if(vAffected == 1.0){
     
    }
`;
  return {
    transformation,
  };
};
