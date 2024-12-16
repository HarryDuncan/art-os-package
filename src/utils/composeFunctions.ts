/* eslint-disable */
/* ts-nocheck */
export const composeFunctions = (functions: any[]) => {
  return (...args: any) => {
    try {
      return functions.reduce((result, currentFunc) => {
        const [newResult1, newResult2] = currentFunc(result[0], result[1]);
        return [newResult1, newResult2];
      }, args);
    } catch (error) {
      console.error("Error in composeFunctions:", error);
      throw error;
    }
  };
};
