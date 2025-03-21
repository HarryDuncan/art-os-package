"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinatesToVector3 = void 0;
const three_1 = require("three");
const coordinatesToVector3 = (coordinate) => new three_1.Vector3(coordinate.x, coordinate.y, coordinate.z);
exports.coordinatesToVector3 = coordinatesToVector3;
