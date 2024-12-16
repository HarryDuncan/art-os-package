/**
 * Mock the resolved value of functions that return promises.
 * e.g. beforeEach(() => {
 *  mockResolvedValue(fetchValues, [{ value: 138 }]);
 * });
 * @param functionToMock The function you want to mock the resolved value for
 * @param resolvedValue The value the mocked function should resolve to
 */
export function mockResolvedValue<
  FunctionToMock extends(...args: any[]) => any,
  ResolvedValue extends jest.ResolvedValue<ReturnType<FunctionToMock>>
>(functionToMock: FunctionToMock, resolvedValue: ResolvedValue): void {
  try {
    (functionToMock as jest.MockedFunction<FunctionToMock>).mockResolvedValue(
      resolvedValue
    );
  } catch (error) {
    console.error(`Error with: ${functionToMock.name}`);
    console.error(error);
  }
}
