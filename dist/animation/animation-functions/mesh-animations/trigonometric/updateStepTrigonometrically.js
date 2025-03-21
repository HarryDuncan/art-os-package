"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStepTrigonometrically = void 0;
const oscilate_1 = require("./oscilate");
const updateStepTrigonometrically = (currentStep, angle, trigFunction) => {
    return currentStep + (0, oscilate_1.oscillate)(angle, trigFunction);
};
exports.updateStepTrigonometrically = updateStepTrigonometrically;
