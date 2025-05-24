export const randomFloat = `float randomFloat(float n) {
    return fract(sin(n) * 43758.5453123);
}`;

export const rand = `
float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
`;
