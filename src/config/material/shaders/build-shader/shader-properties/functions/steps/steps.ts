export const zeroToZeroParabola = {
  id: "zeroToZeroParabola",
  functionDefinition: `
    float zeroToZeroParabola(float u_value) {
        return 1.0 - 4.0 * (u_value - 0.5) * (u_value - 0.5);
    }`,
};
