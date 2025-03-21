import { Asset } from "../../../assets/asset.types";
import { MaterialUniform, ShaderConfig } from "../materials.types";
export declare const configureShaders: (shaderConfig: ShaderConfig, uniforms: MaterialUniform, assets?: Asset[]) => {
    fragmentShader: string;
    vertexShader: string;
    configuredUniforms: MaterialUniform;
};
