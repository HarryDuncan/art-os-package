import { createDeclarationString } from "./createDeclarationString";
import { getDefaultValue } from "./getDefaultValue";
export const setUpCustomPropertyValues = (config, propertyType) => {
    const customProperties = {};
    const customStrings = [];
    config.forEach(({ value, id, valueType, arrayLength, structProperties, arrayValue }) => {
        if (arrayLength !== undefined) {
            const propertyValues = arrayValue !== null && arrayValue !== void 0 ? arrayValue : new Array(arrayLength).fill(value !== null && value !== void 0 ? value : getDefaultValue(valueType, structProperties));
            customProperties[id] = { value: propertyValues };
        }
        else {
            const propertyValue = value !== null && value !== void 0 ? value : getDefaultValue(valueType, structProperties);
            if (propertyValue !== undefined && propertyValue !== null) {
                customProperties[id] = { value: propertyValue };
            }
            else {
                console.warn(`Property value for ${id} ${valueType} is undefined`);
            }
        }
        customStrings.push(createDeclarationString(propertyType, valueType, id, arrayLength, structProperties));
    });
    return { customProperties, customStrings };
};
