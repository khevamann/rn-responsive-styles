import * as React from 'react'
import { DEVICE_SIZES, maxSize, minSize } from '../src'

describe('test that min and max sizes work correctly', () => {
  test('tests that minSize works on large and extra large', () => {
    const sizeString = minSize(DEVICE_SIZES.LARGE_DEVICE)
    expect(sizeString).toEqual('large+extralarge')
  })
  test('tests that minSize works on extra small', () => {
    const sizeString = minSize(DEVICE_SIZES.EXTRA_SMALL_DEVICE)
    expect(sizeString).toEqual('extrasmall+small+medium+large+extralarge')
  })
  test('tests that minSize works on extra large', () => {
    const sizeString = minSize(DEVICE_SIZES.EXTRA_LARGE_DEVICE)
    expect(sizeString).toEqual('extralarge')
  })
  test('tests that maxSize works on small and extra small', () => {
    const sizeString = maxSize(DEVICE_SIZES.SMALL_DEVICE)
    expect(sizeString).toEqual('extrasmall+small')
  })
  test('tests that maxSize works on extra large', () => {
    const sizeString = maxSize(DEVICE_SIZES.EXTRA_LARGE_DEVICE)
    expect(sizeString).toEqual('extrasmall+small+medium+large+extralarge')
  })
  test('tests that maxSize works on extra small', () => {
    const sizeString = maxSize(DEVICE_SIZES.EXTRA_SMALL_DEVICE)
    expect(sizeString).toEqual('extrasmall')
  })
})
