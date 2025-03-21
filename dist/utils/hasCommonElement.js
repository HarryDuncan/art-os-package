"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasCommonValues = void 0;
const hasCommonValues = (array1, array2) => array1.some((value) => array2.includes(value));
exports.hasCommonValues = hasCommonValues;
