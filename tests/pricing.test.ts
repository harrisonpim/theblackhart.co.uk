import { expect, test } from '@playwright/test'

import { calculateSalePrice } from '../utils/pricing'

test.describe('calculateSalePrice', () => {
  test('should return the original price if sale percentage is 0', () => {
    expect(calculateSalePrice(1000, 0)).toBe(1000)
  })

  test('should return the original price if sale percentage is less than 0', () => {
    expect(calculateSalePrice(1000, -0.1)).toBe(1000)
  })

  test('should return the original price if sale percentage is 1 or greater', () => {
    expect(calculateSalePrice(1000, 1)).toBe(1000)
    expect(calculateSalePrice(1000, 1.5)).toBe(1000)
  })

  test('should calculate the sale price correctly for a valid percentage', () => {
    // 1000 * (1 - 0.2) = 800
    expect(calculateSalePrice(1000, 0.2)).toBe(800)
  })

  test('should round the sale price UP to the nearest pound (pence)', () => {
    // 1250 * (1 - 0.2) = 1000
    expect(calculateSalePrice(1250, 0.2)).toBe(1000)
    // 1234 * (1 - 0.2) = 987.2 -> rounds up to 1000
    expect(calculateSalePrice(1234, 0.2)).toBe(1000)
    // 1111 * (1 - 0.1) = 999.9 -> rounds up to 1000
    expect(calculateSalePrice(1111, 0.1)).toBe(1000)
  })

  test('should handle prices that result exactly on a pound boundary after discount', () => {
    // 1250 * (1 - 0.2) = 1000. No rounding needed.
    expect(calculateSalePrice(1250, 0.2)).toBe(1000)
  })
})
