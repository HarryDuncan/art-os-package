export const reduceFunctions = (requiredFunctions) => {
    const allFunctions = requiredFunctions.flatMap((functionArray) => functionArray !== null && functionArray !== void 0 ? functionArray : []);
    const uniqueFunctions = {};
    allFunctions.forEach(({ id, functionDefinition }) => {
        if (!uniqueFunctions[id]) {
            uniqueFunctions[id] = functionDefinition;
        }
    });
    return Object.keys(uniqueFunctions).map((key) => ({
        id: key,
        functionDefinition: uniqueFunctions[key],
    }));
};
