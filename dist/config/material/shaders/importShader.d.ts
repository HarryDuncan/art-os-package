import { MaterialUniform } from "../materials.types";
export declare const importShader: (shaderId: string, vertexShaderId: string | undefined, fragmentShaderId: string | undefined) => {
    fragmentShader: string;
    vertexShader: string;
    setUpDefaultUniforms: (uniforms: MaterialUniform) => MaterialUniform;
};
