import { Object3D } from "three";
import { THREAD_EVENTS } from "./thread.consts";

export const sceneUpdateEvent = () => {
  const e = new CustomEvent(THREAD_EVENTS.UPDATE_SCENE);
  document.dispatchEvent(e);
};

export const sceneTriggeredUpdateEvent = () => {
  const e = new CustomEvent(THREAD_EVENTS.TRIGGERED);
  document.dispatchEvent(e);
};

export const onMeshAdded = (mesh: Object3D) => {
  const e = new CustomEvent(THREAD_EVENTS.MESH_ADDED, { detail: mesh });
  document.dispatchEvent(e);
};
