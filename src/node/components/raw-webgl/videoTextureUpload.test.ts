import { describe, expect, it } from "vitest";
import { nextVideoUpload, VideoUploadState } from "./videoTextureUpload";

const ready = (overrides: Partial<VideoUploadState> = {}): VideoUploadState => ({
  dirty: true,
  readyState: 2,
  videoWidth: 320,
  videoHeight: 180,
  paused: false,
  allocatedWidth: 320,
  allocatedHeight: 180,
  ...overrides,
});

describe("nextVideoUpload", () => {
  it("skips a frame that was not newly presented", () => {
    expect(nextVideoUpload(ready({ dirty: false }))).toBe("skip");
  });

  it("skips while paused, before the first frame, or with no dimensions", () => {
    expect(nextVideoUpload(ready({ paused: true }))).toBe("skip");
    expect(nextVideoUpload(ready({ readyState: 1 }))).toBe("skip");
    expect(nextVideoUpload(ready({ videoWidth: 0 }))).toBe("skip");
    expect(nextVideoUpload(ready({ videoHeight: 0 }))).toBe("skip");
  });

  it("allocates when nothing has been uploaded or the video size changed", () => {
    expect(nextVideoUpload(ready({ allocatedWidth: 0, allocatedHeight: 0 }))).toBe(
      "allocate",
    );
    expect(nextVideoUpload(ready({ videoWidth: 640, videoHeight: 360 }))).toBe(
      "allocate",
    );
  });

  it("replaces pixels when the texture is already the right size", () => {
    expect(nextVideoUpload(ready())).toBe("replace");
  });
});
