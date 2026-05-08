import { Camera } from "three";
import { PeripheralConfig } from "../config/config.types";
import { PeripheralInteraction } from "./types";

let registeredCamera: Camera | null = null;
let registeredConfigs: PeripheralConfig[] = [];

export const registerCameraPeripheralContext = (
  camera: Camera,
  peripheralConfigs: PeripheralConfig[],
) => {
  registeredCamera = camera;
  registeredConfigs = peripheralConfigs;
};

export const deregisterCameraPeripheralContext = () => {
  registeredCamera = null;
  registeredConfigs = [];
};

export const getRegisteredCamera = () => registeredCamera;

export const onCameraPeripheralTrigger = (
  interactionId: string,
  eventData: unknown,
) => {
  if (!registeredCamera) {
    console.warn(
      "onCameraPeripheralTrigger: no camera peripheral context registered",
    );
    return;
  }

  let matchedConfig: PeripheralConfig | undefined;
  let matchedInteraction: PeripheralInteraction | undefined;
  for (const config of registeredConfigs) {
    const found = config.interactions.find((i) => i.guid === interactionId);
    if (found) {
      matchedConfig = config;
      matchedInteraction = found;
      break;
    }
  }

  if (!matchedConfig || !matchedInteraction) {
    console.warn(
      `onCameraPeripheralTrigger: no interaction found with id "${interactionId}"`,
    );
    return;
  }

  // console.log("onCameraPeripheralTrigger: camera update", {
  //   interactionId,
  //   eventData,
  //   outputForCamera: matchedConfig.outputForCamera,
  //   camera: registeredCamera,
  // });
};
