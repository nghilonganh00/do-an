export function formatPriceVN(number: number) {
  return new Intl.NumberFormat("vi-VN").format(number);
}
