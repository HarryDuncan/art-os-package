import { FILE_TYPES } from "consts";
import { loadGLTF } from "./loadGLTF";
import { loadObject } from "./loadObject";

export const loadModel = async (path: string, fileType: string) => {
  switch (fileType) {
    case FILE_TYPES.MODELS.GLTF:
    case FILE_TYPES.MODELS.GLB: {
      const gltf = await loadGLTF(path);
      return gltf.scene;
    }
    case FILE_TYPES.MODELS.OBJ: {
      const object = await loadObject(path);
      return object;
    }
    case "":
    default: {
      console.warn(`no file type specified for ${fileType}`);
      return null;
    }
  }
};
