export const generateUniqueFragName = (fragName, fragParent) => {
    if (fragParent) {
        return `${fragName}_${fragParent}`;
    }
    return fragName;
};
