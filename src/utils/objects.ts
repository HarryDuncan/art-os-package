export const getKeyCount = (
  keySubstring: string,
  object: Record<string, unknown>
) =>
  Object.keys(object).filter((objectKey: string) =>
    objectKey.includes(keySubstring)
  ).length;

export const capitalToCamelCase = (key: string) =>
  `${key.charAt(0).toLowerCase()}${key.slice(1)}`;

export const getOptionalName = (defaultName: string, optionalName?: string) =>
  optionalName || defaultName;

export const createKeyName = (
  defaultName: string,
  object: Record<string, unknown>,
  optionalName?: string
) => {
  const keyName = getOptionalName(defaultName, optionalName);
  const count = getKeyCount(keyName, object);
  return `${keyName}${count || ""}`;
};
