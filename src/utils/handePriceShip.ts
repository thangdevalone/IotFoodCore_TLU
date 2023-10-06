export function handlePriceShip(km: number, sp: number): number {
  if (km <= 3) {
    if (sp <= 3) {
      return Math.floor(3500 * km + 4000 * sp)
    }
    if (sp<=6){
      return Math.floor(3500*km+4500*sp)
    }
    if (sp<=10){
      return Math.floor(3500*km+5000*sp)
    }
    if (sp > 10) {
      return Math.floor(3500 * km + 5700 * sp)
    }
  }
  if (km <= 5) {
    if (sp <= 3) {
      return Math.floor(4000 * km + 5500 * sp)
    }
    if (sp <= 6) {
      return Math.floor(4000 * km + 6000 * sp)
    }
    if (sp <= 10) {
      return Math.floor(3700 * km + 6500 * sp)
    }
    if (sp > 10) {
      return Math.floor(3700 * km + 7000 * sp)
    }
  }
  return Math.floor(5000 * km + 3000 * sp)
}
