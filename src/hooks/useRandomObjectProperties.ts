import { useMemo } from "react";
import { getRandomCoordinates } from "utils/randomize/getRandomCoordinates";
import { Bounds3D } from "utils/three-dimension-space/position/position.types";
import { xyzToArray } from "utils/xyzToArray";

export const useRandomObjectProperties = (
  numberOfObjects: number,
  bounds: Bounds3D
) => {
  return useMemo(() => {
    const coords = getRandomCoordinates(numberOfObjects, bounds);
    const rotation = getRandomCoordinates(numberOfObjects, bounds);
    const randomObjects: { position: number[]; rotation: number[] }[] = [];
    for (let i = 0; i < numberOfObjects; i += 1) {
      randomObjects.push({
        position: xyzToArray(coords[i]),
        rotation: xyzToArray(rotation[i]),
      });
    }
    return randomObjects;
  }, [numberOfObjects, bounds]);
};
