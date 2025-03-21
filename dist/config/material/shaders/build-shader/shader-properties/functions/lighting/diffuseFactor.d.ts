export declare const diffuseFactor = "\n/*\n*  Calculates the diffuse factor produced by the light illumination\n*/\nfloat diffuseFactor(vec3 normal, vec3 light_direction) {\n    float df = dot(normalize(normal), normalize(light_direction));\n\n    if (gl_FrontFacing) {\n        df = -df;\n    }\n\n    return max(0.0, df);\n}";
