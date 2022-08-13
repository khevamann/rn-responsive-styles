import * as React from 'react'
import { ScaledSize } from 'react-native'
import { cleanup, render } from '@testing-library/react-native'
import Sample from './Sample'
import { BreakpointsProvider } from '../src'

afterEach(cleanup)

const mockDimensions = ({ width }: Pick<ScaledSize, 'width'>) => {
  jest.resetModules()
  jest.doMock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn().mockReturnValue({ width }),
    addEventListener: jest.fn(),
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
