"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileTypeFromFilename = void 0;
const getFileTypeFromFilename = (filename) => { var _a; return (_a = filename.split(".").pop()) !== null && _a !== void 0 ? _a : ""; };
exports.getFileTypeFromFilename = getFileTypeFromFilename;
