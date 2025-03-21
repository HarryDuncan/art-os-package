export const removeDuplicatesByKey = (inputArray, keyProperty) => {
    const uniqueObjects = new Map();
    inputArray.forEach((obj) => {
        if (obj[keyProperty]) {
            const keyValue = obj[keyProperty];
            if (!uniqueObjects.has(keyValue)) {
                uniqueObjects.set(keyValue, obj);
            }
        }
    });
    return Array.from(uniqueObjects.values());
};
