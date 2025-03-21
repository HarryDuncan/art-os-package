"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpacity = void 0;
const getOpacity = (hasOpacity) => {
    if (hasOpacity) {
        return `matcapColor.a * opacity`;
    }
    return `matcapColor.a`;
};
exports.getOpacity = getOpacity;
