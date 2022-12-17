import * as React from 'react'
import { ScaledSize, Text } from 'react-native'
import { cleanup, render } from '@testing-library/react-native'
import Sample from './Sample'
import { BreakpointsProvider, SSRProvider } from '../src'

afterEach(cleanup)

const mockDimensions = ({ width }: Pick<ScaledSize, 'width'>) => {
  jest.resetModules()
  jest.doMock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn().mockReturnValue({ width }),
    addEventListener: jest.fn(),
  }))
}
const mockPlatform = (platform: 'ios' | 'web' = 'ios') => {
  jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: platform,
  }))
}

describe('tests that device sizes render appropriately', () => {
  test('tests that with breakpoints this will be a large device', () => {
    mockDimensions({ width: 414 })
    const tree = render(
      <BreakpointsProvider breakpoints={[500, 400, 300, 200]}>
        <Sample />
      </BreakpointsProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot('large')
  })
  test('tests that with breakpoints this will be a extra small device', () => {
    mockDimensions({ width: 150 })
    const tree = render(
      <BreakpointsProvider breakpoints={[500, 400, 300, 200]}>
        <Sample />
      </BreakpointsProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot('extrasmall')
  })
  test('tests that with breakpoints this will be a medium device', () => {
    mockDimensions({ width: 399 })
    const tree = render(
      <BreakpointsProvider breakpoints={[500, 400, 300, 200]}>
        <Sample />
      </BreakpointsProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot('medium')
  })
})

describe('tests that SSR works correctly', () => {
  test('tests that SSR will not block on iOS', () => {
    const tree = render(
      <SSRProvider placeholder={<Text>Loading...</Text>}>
        <Sample />
      </SSRProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('tests that SSR will not block on web', () => {
    mockPlatform('web')

    const tree = render(
      <SSRProvider placeholder={<Text>Loading...</Text>}>
        <Sample />
      </SSRProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('tests that SSR will show loading while rendering on the server', () => {
    mockPlatform('web')
    // This is a hacky way to test rendering on the server, by making sure that useEffect is not called
    jest.spyOn(React, 'useEffect').mockImplementationOnce((_) => null)

    const tree = render(
      <SSRProvider placeholder={<Text>Loading...</Text>}>
        <Sample />
      </SSRProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
