import { expect, test, describe, vi } from "vitest";
import { render } from "@testing-library/react";
import mockConfig from "./mockConfig.json";
import { useScreenSizeProperties } from "../useScreenSizeProperties";
import { SceneConfig } from "../../config.types";
import { ScreenType } from "compat/window-state/types";

const mockFunction = vi.fn();
const mockThreeFunction = vi.fn();
const mockMeshFunction = vi.fn();

describe("useScreenSizeProperties", () => {
  test("returns default config if no adjustment detected", () => {
    render(
      <MockComponent
        mockSceneConfig={mockConfig as unknown as SceneConfig}
        screenType={"DESKTOP"}
      />
    );
    expect(mockFunction).toHaveBeenLastCalledWith(mockConfig);
  });
  test("returns merged three js config for a mobile screen size", () => {
    const withScreenProperties = {
      ...mockConfig,
      screenSizeAdjustments: [
        {
          screenType: "MOBILE",
          threeJsConfig: {
            camera: { position: { x: 0.5, y: -10, z: 90 } },
          },
        },
      ],
    };
    const expectedThreeJsConfig = {
      camera: { position: { x: 0.5, y: -10, z: 90 } },
      controls: {
        minDistance: 10,
        maxDistance: 25,
      },
    };
    render(
      <MockComponent
        mockSceneConfig={withScreenProperties as unknown as SceneConfig}
        screenType={"MOBILE"}
      />
    );
    expect(mockThreeFunction).toHaveBeenLastCalledWith(expectedThreeJsConfig);
  });
  test("merges matching mesh configs for a mobile screen size", () => {
    const withScreenProperties = {
      ...mockConfig,
      screenSizeAdjustments: [
        {
          screenType: "MOBILE",
          threeJsConfig: {
            camera: { position: { x: 0, y: -10, z: 90 } },
          },
          meshComponentConfigs: [
            {
              id: "hjdcurves1",
              size: 20,
              position: { x: -0.5, y: 10, z: 0 },
            },
          ],
        },
      ],
    };
    const expected = [
      {
        id: "hjdcurves1",
        geometryId: "Cube",
        size: 20,
        geometryConfig: {},
        position: { x: -0.5, y: 10, z: 0 },
        rotation: { x: -90, y: -130, z: -40 },
        materialId: "phong-red",
      },
    ];
    render(
      <MockComponent
        mockSceneConfig={withScreenProperties as unknown as SceneConfig}
        screenType={"MOBILE"}
      />
    );
    expect(mockMeshFunction).toHaveBeenLastCalledWith(expected);
  });
});

const MockComponent = ({
  mockSceneConfig,
  screenType,
}: {
  mockSceneConfig: SceneConfig;
  screenType: ScreenType;
}) => {
  const config = useScreenSizeProperties(
    mockSceneConfig,
    screenType
  ) as SceneConfig;
  if (config) {
    const { threeJsConfig, meshComponentConfigs } = config;
    mockFunction(mockConfig);
    mockThreeFunction(threeJsConfig);
    mockMeshFunction(meshComponentConfigs);
  }
  return <div />;
};
