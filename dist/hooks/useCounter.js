import { useState, useCallback } from "react";
export const useCounter = (n, lowerBound, upperBound, direction = "up") => {
    const [count, setCount] = useState(lowerBound);
    const [currentDirection, setCurrentDirection] = useState(direction);
    const stepFunction = useCallback(() => {
        setCount((prevCount) => {
            if (currentDirection === "up") {
                // If the previous count is greater than or equal to the upper bound, change current direction to down
                if (prevCount >= upperBound) {
                    setCurrentDirection("down");
                }
                // Otherwise, increment by n
                return prevCount + n;
            }
            // If the previous count is less than or equal to the lower bound, change current direction to up
            if (prevCount <= lowerBound) {
                setCurrentDirection("up");
            }
            // Otherwise, decrement by n
            return prevCount - n;
        });
    }, [n, currentDirection, lowerBound, upperBound]);
    return { count, stepFunction };
};
