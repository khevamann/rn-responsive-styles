import { matchOverrides } from '../src/hooks/useResponsiveStyle'
import { DEVICE_SIZES } from '../src'

describe('test that regex pattern correctly matches style overrides', () => {
  test.each([
    ['text', DEVICE_SIZES.SM, '$$extrasmall+small$$_text', true],
    ['text', DEVICE_SIZES.SM, '$$small$$_text', true],
    ['text', DEVICE_SIZES.SM, '$$small+large$$_text', true],
    ['text', DEVICE_SIZES.SM, '$extrasmall+small$$_text', false],
    ['text', DEVICE_SIZES.SM, '$$small$_text', false],
    ['text', DEVICE_SIZES.SM, '$$smalllarge$$_text', false],
    ['text', DEVICE_SIZES.SM, '$$small+large$$_text', true],
    ['text', DEVICE_SIZES.SM, 'text', false],
  ])("'%s' style name with '%s' size should match '%s': %s", (defaultClass, size, testString, expected) => {
    const regex = matchOverrides(defaultClass, size)
    expect(regex.test(testString)).toBe(expected)
  })

  test.each([
    ['$container', DEVICE_SIZES.SM, '$$extrasmall+small$$_$container', true],
    ['$container', DEVICE_SIZES.SM, '$$small$$_$container', true],
    ['$container', DEVICE_SIZES.SM, '$$small+large$$_$container', true],
    ['$container', DEVICE_SIZES.SM, '$$small+large$$_container', false],
    ['$container', DEVICE_SIZES.SM, '$extrasmall+small$$_container', false],
    ['$container', DEVICE_SIZES.SM, '$$small$_container', false],
    ['$container', DEVICE_SIZES.SM, '$$smalllarge$$_container', false],
    ['$container', DEVICE_SIZES.SM, 'container', false],
    ['[special]', DEVICE_SIZES.MD, '$$medium$$_[special]', true],
    ['[special]', DEVICE_SIZES.MD, '$$large+medium$$_[special]', true],
    ['[special]', DEVICE_SIZES.MD, 'medium$$_[special]', false],
    ['[special]', DEVICE_SIZES.MD, '$$medium_[special]', false],
    ['[special]', DEVICE_SIZES.MD, 'large+medium_[special]', false],
    ['[special]', DEVICE_SIZES.MD, 'randomString', false],
  ])("'%s' style name with '%s' size should match '%s': %s", (defaultClass, size, testString, expected) => {
    const regex = matchOverrides(defaultClass, size)
    expect(regex.test(testString)).toBe(expected)
  })
})
