import { mapAssetsToUniforms } from "../mapAssetsToUniforms";
import { expect, test, describe } from "vitest";

const MOCK_MAP = [
  {
    uniform: "uMaterial",
    assetId: "chrome",
    relationship: "MATCAP",
  },
];

const MOCK_ASSET = [
  {
    id: "chrome",
    name: "chrome-name",
    url: "",
    assetType: "TEXTURE",
    data: "tttt" as unknown as AssetData,
  },
];
describe("mapAssetsToUniform", () => {
  test("correctly maps textures to the mapped uniform", () => {
    const mockUniforms = {
      uMaterial: { value: null },
    };
    const mappedUniforms = mapAssetsToUniforms(
      MOCK_MAP,
      MOCK_ASSET as Asset[],
      mockUniforms
    );
    expect(mappedUniforms).toEqual({ uMaterial: { value: "tttt" } });
  });

  test("adds the mapped uniform and the asset data to the uniforms if it is not already there", () => {
    const mockUniforms = {
      uMaterial2: { value: null },
    };
    const mappedUniforms = mapAssetsToUniforms(
      MOCK_MAP,
      MOCK_ASSET as Asset[],
      mockUniforms
    );
    expect(mappedUniforms).toEqual({
      uMaterial: { value: "tttt" },
      uMaterial2: { value: null },
    });
  });

  test("maps assets to a new/empty uniform object if there is no uniform object passed", () => {
    const mappedUniforms = mapAssetsToUniforms(MOCK_MAP, MOCK_ASSET as Asset[]);
    expect(mappedUniforms).toEqual({ uMaterial: { value: "tttt" } });
  });
});
