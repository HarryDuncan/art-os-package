export const rotateZ = `
    mat4 rotateZ(float angle){
        float c = cos(angle);
        float s = sin(angle);
          
        return mat4(
            vec4(c, s, 0.0, 0.0),
            vec4(-s, c, 0.0, 0.0),
            vec4(0.0, 0.0, 1.0, 0.0),
            vec4(0.0, 0.0, 0.0, 1.0)
        );
    }
`;
export const rotateX = `
mat4 rotateX(float angle){
    
    float c = cos(angle);
    float s = sin(angle);

    return mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, c, s, 0.0),
    vec4(0.0, -s, c, 0.0),
    vec4(0.0, 0.0, 0.0, 1.0)
    );
}
`;
export const rotateY = `  
mat4 rotateY(float angle) {
    float cosA = cos(angle);
    float sinA = sin(angle);

    return mat4(
        cosA, 0.0, sinA, 0.0,
        0.0, 1.0, 0.0, 0.0,
        -sinA, 0.0, cosA, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}
`;
