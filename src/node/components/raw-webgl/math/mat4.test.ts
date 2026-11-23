import { describe, expect, it } from "vitest";
import { Euler, Matrix3, Matrix4, PerspectiveCamera, Vector3 } from "three";
import {
  compose,
  createMat3,
  createMat4,
  lookAt,
  multiply,
  normalFromMat4,
  ortho,
  perspective,
} from "./mat4";

const expectClose = (actual: Float32Array, expected: ArrayLike<number>) => {
  expect(actual).toHaveLength(expected.length);
  for (let i = 0; i < expected.length; i += 1) {
    expect(actual[i]).toBeCloseTo(expected[i], 5);
  }
};

// three.js is the reference: the raw-webgl engine must place meshes exactly
// where the three.js engine does.
describe("mat4", () => {
  it("composes position + XYZ euler like three.js", () => {
    const position = { x: 1, y: -2, z: 3 };
    const rotation = { x: 0.3, y: -0.7, z: 1.1 };
    const reference = new Matrix4()
      .makeRotationFromEuler(new Euler(rotation.x, rotation.y, rotation.z))
      .setPosition(position.x, position.y, position.z);
    expectClose(compose(createMat4(), position, rotation), reference.elements);
  });

  it("multiplies like three.js", () => {
    const a = new Matrix4().makeRotationY(0.4).setPosition(1, 2, 3);
    const b = new Matrix4().makeRotationX(-1.2).setPosition(-4, 0, 2);
    const out = multiply(
      createMat4(),
      new Float32Array(a.elements),
      new Float32Array(b.elements),
    );
    expectClose(out, new Matrix4().multiplyMatrices(a, b).elements);
  });

  it("matches a three.js PerspectiveCamera projection", () => {
    const camera = new PerspectiveCamera(45, 16 / 9, 1, 1000);
    expectClose(
      perspective(createMat4(), 45, 16 / 9, 1, 1000),
      camera.projectionMatrix.elements,
    );
  });

  it("matches three.js orthographic projection", () => {
    const reference = new Matrix4().makeOrthographic(-2, 2, 1, -1, -1000, 1000);
    expectClose(ortho(createMat4(), -2, 2, -1, 1, -1000, 1000), reference.elements);
  });

  it("builds the view matrix of a three.js camera after lookAt", () => {
    const camera = new PerspectiveCamera();
    camera.position.set(3, 4, 10);
    camera.lookAt(0, 1, 0);
    camera.updateMatrixWorld(true);
    expectClose(
      lookAt(createMat4(), { x: 3, y: 4, z: 10 }, { x: 0, y: 1, z: 0 }),
      camera.matrixWorldInverse.elements,
    );
  });

  it("looks down -Z with no target", () => {
    const view = lookAt(createMat4(), { x: 0, y: 0, z: 5 });
    expectClose(view, new Matrix4().makeTranslation(0, 0, -5).elements);
  });

  it("derives the normal matrix like three.js", () => {
    const m = new Matrix4()
      .makeRotationFromEuler(new Euler(0.2, 0.5, -0.3))
      .scale(new Vector3(2, 1, 0.5))
      .setPosition(1, 2, 3);
    expectClose(
      normalFromMat4(createMat3(), new Float32Array(m.elements)),
      new Matrix3().getNormalMatrix(m).elements,
    );
  });
});
