import { MutableRefObject, useEffect, useRef } from "react";
import { WebGLRenderer } from "three";
import PostProcessor from "../../components/post-processor/PostProcessor";
import { sceneUpdateEvent } from "../threadEvents";
import { useSceneContext } from "../../context/context";

export interface VRRuntimeConfig {
  currentFrameRef: MutableRefObject<number>;
  renderer: WebGLRenderer;
  postProcessor: MutableRefObject<null | PostProcessor>;
}

export const useVRRuntime = ({
  currentFrameRef,
  renderer,
  postProcessor,
}: VRRuntimeConfig) => {
  const { initializedScene, camera } = useSceneContext();

  const vrSessionRef = useRef<XRSession | null>(null);

  const update = () => {
    if (postProcessor.current?.isInitialized()) {
      sceneUpdateEvent();
      if (initializedScene.current) {
        if (initializedScene.current?.orbitControls) {
          initializedScene.current.orbitControls.update();
        }
        if (
          initializedScene.current?.animationManager.hasCameraAnimations() &&
          camera.current
        ) {
          initializedScene.current.animationManager.startCameraAnimation(
            camera.current
          );
        }
      }

      postProcessor.current?.render();
      currentFrameRef.current = requestAnimationFrame(update);
    }
  };

  const pause = () => {
    cancelAnimationFrame(currentFrameRef.current);
  };

  // VR-specific render loop
  const vrRenderLoop = () => {
    if (postProcessor.current?.isInitialized()) {
      sceneUpdateEvent();
      if (initializedScene.current) {
        if (initializedScene.current?.orbitControls) {
          initializedScene.current.orbitControls.update();
        }
        if (
          initializedScene.current?.animationManager.hasCameraAnimations() &&
          camera.current
        ) {
          initializedScene.current.animationManager.startCameraAnimation(
            camera.current
          );
        }

        if (renderer.xr.enabled && camera.current) {
          postProcessor.current?.vrRender(
            initializedScene.current,
            camera.current
          );
        }
      }

      // For VR, we need to render to the XR session
      // Use the standard renderer.xr.render method for VR
    }
  };

  // Initialize VR session
  const initVR = async () => {
    if (!navigator.xr) {
      console.warn("WebXR not supported");
      return false;
    }

    const isSupported = await navigator.xr.isSessionSupported("immersive-vr");
    if (!isSupported) {
      console.warn("VR not supported");
      return false;
    }

    try {
      const session = await navigator.xr.requestSession("immersive-vr", {
        optionalFeatures: ["local-floor", "bounded-floor"],
      });

      vrSessionRef.current = session;

      // Set up the renderer for VR
      await renderer.xr.setSession(session);

      // Start the VR render loop
      session.requestAnimationFrame(vrRenderLoop);

      // Handle session end
      session.addEventListener("end", () => {
        vrSessionRef.current = null;
        // Fall back to standard render loop
        currentFrameRef.current = requestAnimationFrame(update);
      });

      return true;
    } catch (error) {
      console.error("Failed to start VR session:", error);
      return false;
    }
  };

  // Add VR button to the page
  useEffect(() => {
    const addVRButton = async () => {
      if (!navigator.xr) return;

      const isSupported = await navigator.xr.isSessionSupported("immersive-vr");
      if (!isSupported) return;

      try {
        const { VRButton } = await import(
          "three/examples/jsm/webxr/VRButton.js"
        );
        const button = VRButton.createButton(renderer);

        // Add button to the page if it doesn't exist
        if (!document.body.querySelector(".vr-button")) {
          button.classList.add("vr-button");
          document.body.appendChild(button);
        }
      } catch (error) {
        console.error("Failed to create VR button:", error);
      }
    };

    addVRButton();
  }, [renderer]);

  return { update, pause, initVR };
};
