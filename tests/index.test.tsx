import * as React from 'react'
import { ScaledSize } from 'react-native'
import * as renderer from 'react-test-renderer'

import { cleanup } from '@testing-library/react-native'
import Sample from './Sample'

afterEach(cleanup)

const mockDimensions = ({ width }: Pick<ScaledSize, 'width'>) => {
  jest.resetModules()
  jest.doMock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn().mockReturnValue({ width }),
    addEventListener: jest.fn(),
  }))
}
describe('tests that device sizes render appropriately', () => {
  test('tests that extra small devices render correctly', () => {
    mockDimensions({ width: 414 })
    const tree = renderer.create(<Sample />).toJSON()
    expect(tree).toMatchSnapshot('extrasmall')
  })
  test('tests that small devices render correctly', () => {
    mockDimensions({ width: 580 })
    const tree = renderer.create(<Sample />).toJSON()
    expect(tree).toMatchSnapshot('small')
  })
  test('tests that medium devices render correctly', () => {
    mockDimensions({ width: 770 })
    const tree = renderer.create(<Sample />).toJSON()
    expect(tree).toMatchSnapshot('medium')
  })
  test('tests that large devices render correctly', () => {
    mockDimensions({ width: 1000 })
    const tree = renderer.create(<Sample />).toJSON()
    expect(tree).toMatchSnapshot('large')
  })
  test('tests that extra large devices render correctly', () => {
    mockDimensions({ width: 1300 })
    const tree = renderer.create(<Sample />).toJSON()
    expect(tree).toMatchSnapshot('extralarge')
  })
})
