export const getFileTypeFromFilename = (filename: string) =>
  filename.split(".").pop() ?? "";
