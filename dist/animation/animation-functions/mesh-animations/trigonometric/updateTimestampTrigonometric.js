import { oscillate } from "./oscilate";
export const updateTimeStamp = (timestamp, trigFunction) => {
    return oscillate(timestamp, trigFunction, 5000);
};
