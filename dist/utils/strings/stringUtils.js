export const capitalizeFirstLetter = (input) => {
    if (input.length === 0) {
        return input;
    }
    return input.charAt(0).toUpperCase() + input.slice(1);
};
export const lowerCaseFirstLetter = (input) => {
    if (input.length === 0) {
        return input;
    }
    return input.charAt(0).toLowerCase() + input.slice(1);
};
