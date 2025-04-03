import { expect, test, describe } from "vitest";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { RotationEffectProps } from "../../../../types";
import { DEFAULT_ROTATION_EFFECT_CONFIG } from "../rotation.consts";
import { rotationTransform } from "../rotationTransform";
import { rotateZ } from "../../../../shader-properties/functions/rotation/rotation";
import { AXIS } from "utils/types/position.types";
import { ShaderPropertyValueTypes } from "../../../../constants/buildShader.consts";

const MOCK_VERTEX_NAME = "mockVertexName";
const MOCK_POINT = "mockPoint";

describe("rotationTransform", () => {
  test("returns default rotation transformation when default is passed - rotation set via uniform and instatation", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_ROTATION_EFFECT_CONFIG,
      DEFAULT_ROTATION_EFFECT_CONFIG
    );
    const { vertexPointInstantiation, transformation } = rotationTransform(
      MOCK_VERTEX_NAME,
      MOCK_POINT,
      formattedEffectParams as RotationEffectProps
    );
    expect(vertexPointInstantiation).toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
    expect(transformation).toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
  });

  test("returns seperate vertexPointInstatiation that is not declared in the transform ", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_ROTATION_EFFECT_CONFIG,
      DEFAULT_ROTATION_EFFECT_CONFIG
    );
    const effectParams = {
      ...formattedEffectParams,
      declareInTransform: false,
    };
    const { vertexPointInstantiation, transformation } = rotationTransform(
      MOCK_VERTEX_NAME,
      MOCK_POINT,
      effectParams as RotationEffectProps
    );
    expect(vertexPointInstantiation).toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
    expect(transformation).not.toContain(
      `vec4 mockVertexName = vec4(mockPoint.xyz, 1.0);`
    );
  });

  test("returns uniform config where the uniform value uRotationSpeed is set to speed ", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_ROTATION_EFFECT_CONFIG,
      DEFAULT_ROTATION_EFFECT_CONFIG
    );
    const effectParams = {
      ...formattedEffectParams,
      declareInTransform: false,
      speed: 1000,
    };
    const { uniformConfig } = rotationTransform(
      MOCK_VERTEX_NAME,
      MOCK_POINT,
      effectParams as RotationEffectProps
    );
    expect(uniformConfig).toEqual({
      defaultUniforms: [],
      customUniforms: [
        {
          id: "uRotationSpeed",
          valueType: ShaderPropertyValueTypes.FLOAT,
          value: 1000,
        },
      ],
    });
  });

  test("Transform and required functions have the correct function based on the axis passed in the effect props e.g x, y or z", () => {
    const formattedEffectParams = formatFragmentParameters(
      DEFAULT_ROTATION_EFFECT_CONFIG,
      DEFAULT_ROTATION_EFFECT_CONFIG
    );
    const effectParams = {
      ...formattedEffectParams,
      axis: AXIS.Z,
      declareInTransform: false,
    };
    const { transformation, requiredFunctions } = rotationTransform(
      MOCK_VERTEX_NAME,
      MOCK_POINT,
      effectParams as RotationEffectProps
    );
    expect(requiredFunctions).toEqual([
      { id: "rotateZ", functionDefinition: rotateZ },
    ]);
    expect(transformation).toContain(`rotateZ`);
    expect(transformation).not.toContain(`rotateY`);
    expect(transformation).not.toContain(`rotateX`);
  });
});
