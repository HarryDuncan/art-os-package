import { logDebug, logInfo } from "../../../utils/logger";

// HTMLMediaElement.HAVE_CURRENT_DATA. A frame can be uploaded from here on.
const HAVE_CURRENT_DATA = 2;
const SOURCE = "videoTextureUpload";

// Last message per video, so the per-frame call doesn't emit the same line
// again until the decision actually changes.
const lastLogged = new Map<string, string>();

export type VideoUploadState = {
  dirty: boolean;
  readyState: number;
  videoWidth: number;
  videoHeight: number;
  paused: boolean;
  allocatedWidth: number;
  allocatedHeight: number;
};

// `allocate` creates the texture storage from the current frame (first frame,
// or the video's size changed). `replace` copies a new frame into storage
// that is already the right size.
export type VideoUploadAction = "skip" | "allocate" | "replace";

export const nextVideoUpload = (
  state: VideoUploadState,
  assetId?: string,
): VideoUploadAction => {
  const action = decideVideoUpload(state);
  logVideoUpload(assetId, action, state);
  return action;
};

const decideVideoUpload = (state: VideoUploadState): VideoUploadAction => {
  if (!state.dirty || state.paused) return "skip";
  if (
    state.readyState < HAVE_CURRENT_DATA ||
    state.videoWidth === 0 ||
    state.videoHeight === 0
  ) {
    return "skip";
  }
  if (
    state.allocatedWidth !== state.videoWidth ||
    state.allocatedHeight !== state.videoHeight
  ) {
    return "allocate";
  }
  return "replace";
};

// A waiting frame that we refuse (paused, not decoded, no size) is worth
// seeing. An idle `!dirty` skip happens every frame and is not.
const skipReason = (state: VideoUploadState): string | null => {
  if (!state.dirty) return null;
  if (state.paused) return "paused";
  if (state.readyState < HAVE_CURRENT_DATA) {
    return `not ready (readyState ${state.readyState})`;
  }
  if (state.videoWidth === 0 || state.videoHeight === 0) return "no dimensions yet";
  return null;
};

const logVideoUpload = (
  assetId: string | undefined,
  action: VideoUploadAction,
  state: VideoUploadState,
) => {
  const id = assetId ?? "video";
  if (action === "skip") {
    const reason = skipReason(state);
    if (!reason) return;
    const key = `skip:${reason}`;
    if (lastLogged.get(id) === key) return;
    lastLogged.set(id, key);
    logDebug(`skipping video upload: ${reason}`, { assetId: id, ...state }, SOURCE);
    return;
  }

  const key = `${action}:${state.videoWidth}x${state.videoHeight}`;
  if (lastLogged.get(id) === key) return;
  lastLogged.set(id, key);
  const data = {
    assetId: id,
    videoWidth: state.videoWidth,
    videoHeight: state.videoHeight,
    allocatedWidth: state.allocatedWidth,
    allocatedHeight: state.allocatedHeight,
  };
  if (action === "allocate") logInfo("allocating video texture", data, SOURCE);
  else logDebug("replacing video frame", data, SOURCE);
};
