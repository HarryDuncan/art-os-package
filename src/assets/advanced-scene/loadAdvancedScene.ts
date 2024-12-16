import { FILE_TYPES } from "consts";
import { loadGLTF } from "../geometry/load-model/loadGLTF";

export const loadAdvancedScene = async (path: string, fileType: string) => {
  switch (fileType) {
    case FILE_TYPES.MODELS.GLTF:
    case FILE_TYPES.MODELS.GLB: {
      const gltf = await loadGLTF(path);
      return gltf;
    }
    case "":
    default: {
      console.warn(`no file type specified for ${fileType}`);
      return null;
    }
  }
};
