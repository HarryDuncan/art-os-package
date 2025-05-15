import { TransformationConfig } from "../../../buildShader.types";

export const affectedPositionTransformConfig = {
  effectName: "affectedPosition",
  instantiationName: "",
  singleInstance: true,
  allowedValueTypes: [],
  prefix: "",
  effectCode: ["if(vAffected == 1.0){"],
} as unknown as TransformationConfig;
