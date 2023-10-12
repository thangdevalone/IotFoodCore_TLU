export function handleDiscount(
  price: number,
  discount: number,
  code: string,
): number {
  if (code.search("K") !== -1) {
    return price - discount * 1000
  }
  if (code.search("MA") !== -1) {
    const maxDis =
      Number(code.slice(code.search("MA") + 3, code.length) + "000") ||
      10000
    const dis =
      (price * discount) / 100 > maxDis ? maxDis : (price * discount) / 100
    return price - dis
  }
  return price - (price * discount) / 100
}
