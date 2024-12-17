import { RawShaderMaterial } from "three";
import { InteractiveScene } from "../../../../components/interactive-scene/InteractiveScene";
import { getMeshesByIdentifier } from "../../../../utils/scene/object-finding/getMeshesByIdentifier";
import { AnimatedScene } from "../../../animation.types";

export const updateSceneMeshesUniform = (
  scene: InteractiveScene,
  identifier: string,
  uniformKey: string,
  uniformValue: unknown
) => {
  const meshes = getMeshesByIdentifier(
    scene as unknown as AnimatedScene,
    identifier
  );
  meshes.forEach((mesh) => {
    const material = mesh.material as RawShaderMaterial;
    if (material.uniforms[uniformKey]) {
      material.uniforms[uniformKey].value = uniformValue;
    }
  });
};
