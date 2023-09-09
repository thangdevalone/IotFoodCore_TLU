export const formatCurrencyVND = (amount: string): string => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })

  return formatter.format(Number(amount))
}

export const formatCurrencyKM = (KM: string): string => {
  return `${KM} km`
}
