export const getKeyCount = (keySubstring, object) => Object.keys(object).filter((objectKey) => objectKey.includes(keySubstring)).length;
export const capitalToCamelCase = (key) => `${key.charAt(0).toLowerCase()}${key.slice(1)}`;
export const getOptionalName = (defaultName, optionalName) => optionalName || defaultName;
export const createKeyName = (defaultName, object, optionalName) => {
    const keyName = getOptionalName(defaultName, optionalName);
    const count = getKeyCount(keyName, object);
    return `${keyName}${count || ""}`;
};
