export declare const useCounter: (n: number, lowerBound: number, upperBound: number, direction?: "up" | "down") => {
    count: number;
    stepFunction: () => void;
};
