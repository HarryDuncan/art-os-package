"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeArraysWithoutDuplicates = void 0;
const mergeArraysWithoutDuplicates = (first, second, key = "id") => {
    const mapById = new Map(first.map((obj) => [obj[key], obj]));
    second.forEach((obj) => {
        if (!mapById.has(obj[key])) {
            mapById.set(obj[key], obj);
        }
    });
    const mergedArray = Array.from(mapById.values());
    return mergedArray;
};
exports.mergeArraysWithoutDuplicates = mergeArraysWithoutDuplicates;
