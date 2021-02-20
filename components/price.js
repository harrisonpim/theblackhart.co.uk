export default function formatPrice(price) {
  if (price && price > 0) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format((price / 100).toFixed(2));
  } else {
    return "free";
  }
}
