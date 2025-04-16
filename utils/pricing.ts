export const calculateSalePrice = (
  originalPrice: number,
  salePercentage: number
): number => {
  // Return original price if sale percentage is not valid (e.g., <= 0% or >= 100%)
  if (salePercentage <= 0 || salePercentage >= 1) {
    return originalPrice
  }

  // Calculate the discounted price in pence
  const discountedPricePence = originalPrice * (1 - salePercentage)

  // Round up the price to the nearest whole pound
  const roundedUpPoundPricePence = Math.ceil(discountedPricePence / 100) * 100

  return roundedUpPoundPricePence
}
