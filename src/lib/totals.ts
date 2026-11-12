export function computeTotals(subTotal: number, discountPercent: number, vatRate: number, vatMode: 'standard' | 'none') {
  const discount = (subTotal * discountPercent) / 100
  const afterDiscount = subTotal - discount
  const rate = vatMode === 'none' ? 0 : vatRate
  const tax = (afterDiscount * rate) / 100
  const total = afterDiscount + tax
  return { discount, tax, total }
}
