export function handlePriceShip(km: number, sp: number): number {
  let lastPrice = 0
  if (km <= 3) {
    if (sp === 1) {
      lastPrice = Math.floor(3000 * km + 3000 * sp)
    }
    if (sp === 3) {
      lastPrice = Math.floor(3000 * km + 2500 * sp)
    }
    if (sp <= 4) {
      lastPrice =
        Math.floor(2800 * km + 3000 * sp) > 15000
          ? Math.floor(2800 * km + 2500 * sp)
          : Math.floor(2800 * km + 3000 * sp)
    }
    if (sp <= 6) {
      lastPrice =
        Math.floor(2800 * km + 2700 * sp) > 20000
          ? Math.floor(2800 * km + 2000 * sp)
          : Math.floor(2800 * km + 2700 * sp)
    }
    if (sp <= 10) {
      lastPrice =
        Math.floor(2800 * km + 3500 * sp) > 25000
          ? Math.floor(2800 * km + 3000 * sp)
          : Math.floor(2800 * km + 3500 * sp)
    }
    if (sp > 10) {
      lastPrice =
        Math.floor(2800 * km + 3000 * sp) > 30000
          ? Math.floor(2800 * km +2500 * sp)
          : Math.floor(2800 * km + 3000 * sp)
    }
  }
  if (km <= 5) {
    if (sp === 1) {
      lastPrice = Math.floor(3200 * km + 3000 * sp)
    }
    if (sp === 1) {
      lastPrice = Math.floor(3200 * km + 2700 * sp)
    }
    if (sp <= 3) {
      lastPrice =
        Math.floor(3000 * km + 2700 * sp) > 15000
          ? Math.floor(3000 * km + 2500 * sp)
          : Math.floor(3000 * km + 2700 * sp)
    }
    if (sp <= 6) {
      lastPrice =
        Math.floor(3000 * km + 3000 * sp) > 20000
          ? Math.floor(3000 * km + 2700 * sp)
          : Math.floor(3000 * km + 3000 * sp)
    }
    if (sp <= 10) {
      lastPrice =
        Math.floor(3700 * km + 3200 * sp) > 25000
          ? Math.floor(3700 * km + 2700 * sp)
          : Math.floor(3700 * km + 3200 * sp)
    }
    if (sp > 10) {
      lastPrice =
        Math.floor(3700 * km + 3500 * sp) > 30000
          ? Math.floor(3700 * km + 3000 * sp)
          : Math.floor(3700 * km + 3500 * sp)
    }
  }
  return lastPrice >= 40000 ? 35000:  lastPrice >= 35000 ?lastPrice*0.8: lastPrice
}
