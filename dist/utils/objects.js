"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeyName = exports.getOptionalName = exports.capitalToCamelCase = exports.getKeyCount = void 0;
const getKeyCount = (keySubstring, object) => Object.keys(object).filter((objectKey) => objectKey.includes(keySubstring)).length;
exports.getKeyCount = getKeyCount;
const capitalToCamelCase = (key) => `${key.charAt(0).toLowerCase()}${key.slice(1)}`;
exports.capitalToCamelCase = capitalToCamelCase;
const getOptionalName = (defaultName, optionalName) => optionalName || defaultName;
exports.getOptionalName = getOptionalName;
const createKeyName = (defaultName, object, optionalName) => {
    const keyName = (0, exports.getOptionalName)(defaultName, optionalName);
    const count = (0, exports.getKeyCount)(keyName, object);
    return `${keyName}${count || ""}`;
};
exports.createKeyName = createKeyName;
