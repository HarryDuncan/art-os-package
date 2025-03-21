"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zeroToZeroParabola = void 0;
exports.zeroToZeroParabola = {
    id: "zeroToZeroParabola",
    functionDefinition: `
    float zeroToZeroParabola(float u_value) {
        return 1.0 - 4.0 * (u_value - 0.5) * (u_value - 0.5);
    }`,
};
