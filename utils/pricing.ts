export const getSalePercentageForProduct = (
  productCategory: Array<{ id: string }>,
  jewelleryPercentage?: number,
  nonJewelleryPercentage?: number,
  defaultPercentage = 0
): number => {
  // Determine if product is jewellery (rings, necklaces, or earrings)
  const categoryIds = productCategory.map((cat) => cat.id)
  const isJewellery = categoryIds.some(
    (id) => id === 'rings' || id === 'necklaces' || id === 'earrings'
  )

  // Helper to check if a value is a valid percentage
  const isValidPercentage = (value: unknown): value is number => {
    return typeof value === 'number' && !isNaN(value) && value >= 0
  }

  // If category-specific percentages are provided and valid, use them
  if (isJewellery && isValidPercentage(jewelleryPercentage)) {
    return jewelleryPercentage
  }
  if (!isJewellery && isValidPercentage(nonJewelleryPercentage)) {
    return nonJewelleryPercentage
  }

  // Fall back to default percentage
  return defaultPercentage
}

export const calculateSalePrice = (
  originalPrice: number,
  salePercentage: number
): number => {
  // Return original price if sale percentage is not valid (e.g., NaN, <= 0% or >= 100%)
  if (isNaN(salePercentage) || salePercentage <= 0 || salePercentage >= 1) {
    return originalPrice
  }

  // Calculate the discounted price in pence
  const discountedPricePence = originalPrice * (1 - salePercentage)

  // Round up the price to the nearest whole pound
  const roundedUpPoundPricePence = Math.ceil(discountedPricePence / 100) * 100

  return roundedUpPoundPricePence
}
