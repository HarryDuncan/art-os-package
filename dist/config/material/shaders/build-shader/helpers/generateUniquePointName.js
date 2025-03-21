"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniquePointName = void 0;
const randomValue = () => (Math.random() * 100000).toFixed(0);
const generateUniquePointName = (pointName, pointParent) => {
    if (pointParent) {
        return `${pointName}_${pointParent}_${randomValue()}`;
    }
    return `${pointName}_${randomValue()}`;
};
exports.generateUniquePointName = generateUniquePointName;
