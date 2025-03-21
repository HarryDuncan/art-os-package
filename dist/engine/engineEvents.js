"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMeshAdded = exports.sceneTriggeredUpdateEvent = exports.sceneUpdateEvent = void 0;
const engine_consts_1 = require("./engine.consts");
const sceneUpdateEvent = () => {
    const e = new CustomEvent(engine_consts_1.ENGINE_EVENTS.UPDATE_SCENE);
    document.dispatchEvent(e);
};
exports.sceneUpdateEvent = sceneUpdateEvent;
const sceneTriggeredUpdateEvent = () => {
    const e = new CustomEvent(engine_consts_1.ENGINE_EVENTS.TIGGERED_UPDATE);
    document.dispatchEvent(e);
};
exports.sceneTriggeredUpdateEvent = sceneTriggeredUpdateEvent;
const onMeshAdded = (mesh) => {
    const e = new CustomEvent(engine_consts_1.ENGINE_EVENTS.MESH_ADDED, { detail: mesh });
    document.dispatchEvent(e);
};
exports.onMeshAdded = onMeshAdded;
