import { Mesh, Points, RawShaderMaterial } from "three";
import { InteractiveScene } from "../components/interactive-scene/InteractiveScene";

export const updateUTime = (scene: InteractiveScene) => {
  const time = scene.clock?.getElapsedTime() ?? 0;
  scene.children.forEach((child) => {
    if (child instanceof Mesh || child instanceof Points) {
      const material = child.material as RawShaderMaterial;
      material.uniforms.uTime.value = time;
    }
  });
};
