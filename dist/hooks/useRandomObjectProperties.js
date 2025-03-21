"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRandomObjectProperties = void 0;
const react_1 = require("react");
const getRandomCoordinates_1 = require("../utils/randomize/getRandomCoordinates");
const xyzToArray_1 = require("../utils/xyzToArray");
const useRandomObjectProperties = (numberOfObjects, bounds) => {
    return (0, react_1.useMemo)(() => {
        const coords = (0, getRandomCoordinates_1.getRandomCoordinates)(numberOfObjects, bounds);
        const rotation = (0, getRandomCoordinates_1.getRandomCoordinates)(numberOfObjects, bounds);
        const randomObjects = [];
        for (let i = 0; i < numberOfObjects; i += 1) {
            randomObjects.push({
                position: (0, xyzToArray_1.xyzToArray)(coords[i]),
                rotation: (0, xyzToArray_1.xyzToArray)(rotation[i]),
            });
        }
        return randomObjects;
    }, [numberOfObjects, bounds]);
};
exports.useRandomObjectProperties = useRandomObjectProperties;
