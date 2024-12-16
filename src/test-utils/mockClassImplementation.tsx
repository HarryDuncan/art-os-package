import React, { Component, ReactNode } from 'react';

type Implementation<P> = (props: P) => ReactNode;

class MockClass<
  P extends { implementation: Implementation<any> }
> extends Component<P> {
  render() {
    const { implementation, ...rest } = this.props;
    return implementation(rest);
  }
}

export const mockClassImplementation = <P, >(
  ClassToMock: jest.Constructable,
  implementation: Implementation<P>,
) => (ClassToMock as jest.MockedClass<
    typeof ClassToMock
  >).mockImplementation((props: P) => ((
    <MockClass {...props} implementation={implementation} />
    ) as unknown) as typeof ClassToMock);
