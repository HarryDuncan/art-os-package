import { expect, test, describe, vi } from "vitest";
import { render } from "@testing-library/react";
import mockConfig from "./mockConfig.json";
import { useAssetLocation } from "../useAssetLocation";
import React from "react";
const mockFunction = vi.fn();

describe("useAssetLocation", () => {
  test("if running locally asset url points to public folder i.e returns the url from config", () => {
    render(<MockComponent mockConfig={mockConfig} />);
    expect(mockFunction).toHaveBeenCalledWith(
      "../assets/textures/point-textures/1.png"
    );
  });
  test("if running on server asset url is concatenated with NEXT_PUBLIC_CONTENT_ROOT", () => {
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
    const url = assets[0].url;
    mockFunction(url);
  }

  return <div />;
};
