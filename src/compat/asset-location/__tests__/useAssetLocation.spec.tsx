import { expect, test, describe, vi } from "vitest";
import { render } from "@testing-library/react";
import mockConfig from "./mockConfig.json";
import { useAssetLocation } from "../useAssetLocation";
import React from "react";
const mockFunction = vi.fn();

describe("useAssetLocation", () => {
  test("if running locally asset path points to public folder i.e returns the path from config", () => {
    render(<MockComponent mockConfig={mockConfig} />);
    expect(mockFunction).toHaveBeenCalledWith(
      "../assets/textures/point-textures/1.png"
    );
  });
  test("if running on server asset path is concatenated with NEXT_PUBLIC_CONTENT_ROOT", () => {
    vi.stubGlobal("NEXT_PUBLIC_CONTENT_ROOT", "root");
    render(<MockComponent mockConfig={mockConfig} />);
    expect(mockFunction).toHaveBeenCalledWith(
      "root/assets/textures/point-textures/1.png"
    );
  });
});

const MockComponent = ({ mockConfig }) => {
  const config = useAssetLocation(mockConfig);
  if (config) {
    const assets = config[0].assets ?? [];
    const path = assets[0].path;
    mockFunction(path);
  }

  return <div />;
};
