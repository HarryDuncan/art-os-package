"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchInteractionEvent = void 0;
const dispatchInteractionEvent = (eventName, data) => {
    const e = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(e);
};
exports.dispatchInteractionEvent = dispatchInteractionEvent;
