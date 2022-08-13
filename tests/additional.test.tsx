import OverwriteStyle from './OverwriteStyle'
import * as React from 'react'
import { cleanup, render } from '@testing-library/react-native'
import { ScaledSize } from 'react-native'

afterEach(cleanup)

const mockDimensions = ({ width }: Pick<ScaledSize, 'width'>) => {
  jest.resetModules()
  jest.doMock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn().mockReturnValue({ width }),
    addEventListener: jest.fn(),
  }))
}

describe('additional tests for specific cases', () => {
  test('tests that regex only picks up the exact class specified', () => {
    mockDimensions({ width: 470 })
    const tree = render(<OverwriteStyle />).toJSON()
    expect(tree).toMatchSnapshot('small')
  })
  test('tests that regex does not include extra classes', () => {
    mockDimensions({ width: 770 })
    const tree = render(<OverwriteStyle />).toJSON()
    expect(tree).toMatchSnapshot('medium')
  })
})
