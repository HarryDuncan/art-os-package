import { getAssetMappedMaterials } from "../getAssetMappedMaterials";
import { expect, test, describe } from "vitest";

const mockAssets = [
  {
    name: "metal-materials",
    url: "../assets/textures/matcaps/irredescent-4.jpg",
    assetType: "TEXTURE",
    id: "chrome",
  },
];
const mockMaterialConfig = [
  {
    id: "matcap-material",
    materialProps: {
      assetId: "chrome",
    },
    materialType: "MATCAP",
  },
];
describe("getAssetMappedMaterials", () => {
  test("Maps texture data to matcap material by asset id", () => {
    const configuredMaterials = getAssetMappedMaterials(
      mockMaterialConfig,
      mockAssets
    );
  });
  test("Maps texture url to env map material by asset id", () => {
    const configuredMaterials = getAssetMappedMaterials(
      mockMaterialConfig,
      mockAssets
    );
  });
  test("Maps video id to video material by asset id", () => {
    const configuredMaterials = getAssetMappedMaterials(
      mockMaterialConfig,
      mockAssets
    );
  });
  test("Doesn't return/try to configure non asset mapped material configs", () => {
    const configuredMaterials = getAssetMappedMaterials(
      mockMaterialConfig,
      mockAssets
    );
  });
  test("Doesn't return materials where there is no matching asset id", () => {
    const configuredMaterials = getAssetMappedMaterials(
      mockMaterialConfig,
      mockAssets
    );
  });
});
