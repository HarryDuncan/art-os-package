"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeFunctions = void 0;
/* eslint-disable */
/* ts-nocheck */
const composeFunctions = (functions) => {
    return (...args) => {
        try {
            return functions.reduce((result, currentFunc) => {
                const [newResult1, newResult2] = currentFunc(result[0], result[1]);
                return [newResult1, newResult2];
            }, args);
        }
        catch (error) {
            console.error("Error in composeFunctions:", error);
            throw error;
        }
    };
};
exports.composeFunctions = composeFunctions;
