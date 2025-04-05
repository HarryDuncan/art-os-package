/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { InteractiveScene } from "../../../components/interactive-scene/InteractiveScene";
import { Object3D } from "three";
import { getMeshesByIdentifier } from "../../../utils/scene/object-finding/getMeshesByIdentifier";

export const animateMarchingCube = (scene: InteractiveScene) => {
  const time = scene.clock.getElapsedTime() * 0.08;
  const marchingCube = getMeshesByIdentifier(scene, "marching-cubes");
  if (!marchingCube.length) {
    return;
  }

  const cube = marchingCube[0];
  updateCubes(cube, time, 15);
};

export const updateCubes = (
  object: Object3D,
  time: number,
  numblobs: number
) => {
  object.reset();

  // fill the field with some metaballs
  const subtract = 12;
  const strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

  for (let i = 0; i < numblobs; i += 1) {
    const ballx =
      Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 +
      0.5;
    const bally =
      Math.abs(Math.tan(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77; // dip into the floor
    const ballz =
      Math.cos(i + 1.32 * time * 0.1 * Math.sin(0.92 + 0.53 * i)) * 0.27;

    object.addBall(ballx, bally, ballz, strength, subtract);
  }
  object.update();
};

export const createMarchingCubeAnimation = async (
  resolution: number,
  isolation: number
): Promise<Object3D> => {
  const { MarchingCubes } = await import(
    "three/examples/jsm/objects/MarchingCubes.js"
  );
  const marchingCubes = new MarchingCubes(resolution, isolation);
  return marchingCubes;
};
