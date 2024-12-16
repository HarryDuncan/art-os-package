import { getPointColor } from "../getPointColor";

const mockPointTextures = [
  { id: "uTexture1", pointColor: "#ff1205" },
  { id: "uTexture2", pointColor: "#ff1005" },
];
const fragName = "mockPoint";
const mockPointColor = "";
describe("coordinateObjectToArray", () => {
  test("returns the default color if no point color is specified", () => {
    const result = getPointColor(fragName, []);
    expect(result).toEqual(`vec4 mockPoint =  vec4(1.0, 0.0, 0.0, opacity);`);
  });
  test("returns a parsed color if no point color is specified and parsed color is parsed", () => {
    const result = getPointColor(fragName, [], mockPointColor);
    expect(result).toEqual(`vec4 ${fragName} =  vec4(1.0, 0.0, 0.0, opacity);`);
  });
  test("returns specified colors based on the point type", () => {
    const result = getPointColor(fragName, mockPointTextures, mockPointColor);
    expect(result).toEqual(`vec4 ${fragName} =  vec4(1.0, 0.0, 0.0, opacity);`);
  });

  test("if there is no valid point color associated with the point definition it will return the default", () => {
    const updatedPointDefs = mockPointTextures.concat({
      id: "uTexture3",
      pointColor: "#rrrrrrrrr",
    });
    const result = getPointColor(fragName, updatedPointDefs, mockPointColor);
    expect(result).toEqual(`vec4 ${fragName} =  vec4(1.0, 0.0, 0.0, opacity);`);
  });
});
