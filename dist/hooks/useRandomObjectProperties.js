import { useMemo } from "react";
import { getRandomCoordinates } from "../utils/randomize/getRandomCoordinates";
import { xyzToArray } from "../utils/xyzToArray";
export const useRandomObjectProperties = (numberOfObjects, bounds) => {
    return useMemo(() => {
        const coords = getRandomCoordinates(numberOfObjects, bounds);
        const rotation = getRandomCoordinates(numberOfObjects, bounds);
        const randomObjects = [];
        for (let i = 0; i < numberOfObjects; i += 1) {
            randomObjects.push({
                position: xyzToArray(coords[i]),
                rotation: xyzToArray(rotation[i]),
            });
        }
        return randomObjects;
    }, [numberOfObjects, bounds]);
};
