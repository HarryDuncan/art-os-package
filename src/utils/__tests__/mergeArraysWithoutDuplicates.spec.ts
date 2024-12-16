import { mergeArraysWithoutDuplicates } from "../mergeArraysWithoutDuplicates";

describe("mergeArraysWithoutDuplicates", () => {
  it('merges arrays without duplicates based on default key ("id")', () => {
    const firstArray = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Bob" },
    ];

    const secondArray = [
      { id: 2, name: "Doe" },
      { id: 3, name: "Alice" },
      { id: 4, name: "Charlie" },
    ];

    const mergedResult = mergeArraysWithoutDuplicates(firstArray, secondArray);
    const expected = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Bob" },
      { id: 4, name: "Charlie" },
    ];

    expect(mergedResult).toEqual(expected);
  });
  it('merges arrays without duplicates based on custom key ("customKey")', () => {
    const firstArray = [
      { customKey: "a", value: "Alpha" },
      { customKey: "b", value: "Beta" },
    ];

    const secondArray = [
      { customKey: "b", value: "Bravo" },
      { customKey: "c", value: "Charlie" },
    ];

    const mergedResult = mergeArraysWithoutDuplicates(
      firstArray,
      secondArray,
      "customKey"
    );
    const expected = [
      { customKey: "a", value: "Alpha" },
      { customKey: "b", value: "Beta" },
      { customKey: "c", value: "Charlie" },
    ];

    expect(mergedResult).toEqual(expected);
  });
});
