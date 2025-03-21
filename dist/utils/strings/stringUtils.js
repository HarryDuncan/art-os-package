"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerCaseFirstLetter = exports.capitalizeFirstLetter = void 0;
const capitalizeFirstLetter = (input) => {
    if (input.length === 0) {
        return input;
    }
    return input.charAt(0).toUpperCase() + input.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const lowerCaseFirstLetter = (input) => {
    if (input.length === 0) {
        return input;
    }
    return input.charAt(0).toLowerCase() + input.slice(1);
};
exports.lowerCaseFirstLetter = lowerCaseFirstLetter;
