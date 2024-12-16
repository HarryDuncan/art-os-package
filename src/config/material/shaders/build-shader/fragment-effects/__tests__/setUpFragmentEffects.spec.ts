import { EMPTY_UNIFORM_CONFIG } from "../../shader-properties/uniforms/uniforms.consts";
import { FragmentEffectConfig } from "../fragmentEffects.types";
import { setUpFragmentEffects } from "../setUpFragmentEffects";
import { expect, test, describe } from "vitest";
import config from "./fragmentEffects.json";

describe("setUpFragmentEffects", () => {
  test("returns standard fragment effects if nothing is provided", () => {
    const result = setUpFragmentEffects(config[0] as FragmentEffectConfig[]);
    const expected = {
      requiredFunctions: [],
      attributeConfigs: [],
      transformations: "vec4 fragColor = vec4(1.0,0,0,1.0);",
      uniformConfigs: EMPTY_UNIFORM_CONFIG,
      varyingConfigs: [],
      fragColor: `gl_FragColor = fragColor;`,
    };
    expect(result).toStrictEqual(expected);
  });
  test("returns correct fragment shader and config", () => {
    const result = setUpFragmentEffects(config[0] as FragmentEffectConfig[]);
    const expected = {
      attributeConfigs: [],
      requiredFunctions: [],
      transformations: "vec4 fragColor = vec4(1.0,0,0,1.0);",
      uniformConfigs: EMPTY_UNIFORM_CONFIG,
      varyingConfigs: [],
      fragColor: `gl_FragColor = fragColor;`,
    };
    expect(result).toStrictEqual(expected);
  });
  //   test("returns multiple fragment effects correctly", () => {
  //     const result = setUpFragmentEffects(config[0] as FragmentEffectConfig[]);
  //     const expected = {
  //       requiredFunctions: {},
  //       transformationStrings:
  //         "explodeTransformationString; vertexFilterTransformation; ",
  //       uniformConfigs: {
  //         customUniforms: [
  //           {
  //             name: "uPower",
  //             type: "FLOAT",
  //             value: 1.5,
  //           },
  //           { name: "uReduced", type: "FLOAT", value: 5.0 },
  //         ],
  //         defaultUniforms: ["uPosition"],
  //       },
  //       varyingConfigs: [
  //         {
  //           name: "vPointId",
  //           type: "FLOAT",
  //           varyingType: "ATTRIBUTE",
  //         },
  //       ],
  //       viewMatrix: `gl_Position = projectionMatrix * modelViewMatrix * filteredPoint;`,
  //     };
  //     expect(result).toStrictEqual(expected);
  //   });
});
