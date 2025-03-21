"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpCustomPropertyValues = void 0;
const createDeclarationString_1 = require("./createDeclarationString");
const getDefaultValue_1 = require("./getDefaultValue");
const setUpCustomPropertyValues = (config, propertyType) => {
    const customProperties = {};
    const customStrings = [];
    config.forEach(({ value, id, valueType, arrayLength, structProperties, arrayValue }) => {
        if (arrayLength !== undefined) {
            const propertyValues = arrayValue !== null && arrayValue !== void 0 ? arrayValue : new Array(arrayLength).fill(value !== null && value !== void 0 ? value : (0, getDefaultValue_1.getDefaultValue)(valueType, structProperties));
            customProperties[id] = { value: propertyValues };
        }
        else {
            const propertyValue = value !== null && value !== void 0 ? value : (0, getDefaultValue_1.getDefaultValue)(valueType, structProperties);
            if (propertyValue !== undefined && propertyValue !== null) {
                customProperties[id] = { value: propertyValue };
            }
            else {
                console.warn(`Property value for ${id} ${valueType} is undefined`);
            }
        }
        customStrings.push((0, createDeclarationString_1.createDeclarationString)(propertyType, valueType, id, arrayLength, structProperties));
    });
    return { customProperties, customStrings };
};
exports.setUpCustomPropertyValues = setUpCustomPropertyValues;
