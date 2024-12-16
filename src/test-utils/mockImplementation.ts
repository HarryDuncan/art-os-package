/**
 * Mock function implementations.
 * e.g. beforeEach(() => {
 *  mockImplementation(fetchValues, () => Promise.resolve([{ value: 138 }]));
 * });
 * @param functionToMock The function you want to mock
 * @param implementation The implementation of the function you're mocking
 */
export function mockImplementation<
  FunctionToMock extends(...args: any[]) => any,
  Implementation extends (...args: any[]) => any
>(functionToMock: FunctionToMock, implementation: Implementation): void {
  try {
    if (jest.isMockFunction(implementation)) throw new Error('Passed implementation must not be a jest.fn()');
    (functionToMock as jest.MockedFunction<FunctionToMock>).mockImplementation(implementation);
  } catch (error) {
    console.error(`Error with: ${functionToMock.name}`, error);
  }
}
