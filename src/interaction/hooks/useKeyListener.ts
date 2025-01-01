import { Key, useEffect } from "react";

export const useKeyListener = (key: Key, onKeyPress: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === key) {
        onKeyPress();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [key, onKeyPress]);
};
