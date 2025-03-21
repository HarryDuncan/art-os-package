"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimeStamp = void 0;
const oscilate_1 = require("./oscilate");
const updateTimeStamp = (timestamp, trigFunction) => {
    return (0, oscilate_1.oscillate)(timestamp, trigFunction, 5000);
};
exports.updateTimeStamp = updateTimeStamp;
