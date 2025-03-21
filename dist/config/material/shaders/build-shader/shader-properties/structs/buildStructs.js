"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStruct = void 0;
const structs_consts_1 = require("./structs.consts");
const buildStruct = (config) => {
    const formatted = config.map(({ id, properties }) => {
        const propertyObject = formatPropertyObject(properties);
        return `struct ${id} { \n ${propertyObject} \n };`;
    });
    const structDeclarations = [structs_consts_1.STRUCT_DECLARATION, ...formatted];
    return structDeclarations.join(" \n ");
};
exports.buildStruct = buildStruct;
const formatPropertyObject = (properties) => properties
    .map(({ id, valueType }) => `${valueType.toLowerCase()} ${id};`)
    .join(" \n ");
