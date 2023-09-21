export function handlePriceShip(km:number,sp:number):number{
  if (km<=3){
    if (sp<=3){
      return Math.floor(3000*km+800*sp)
    }
    if (sp<=6){
      return Math.floor(3000*km+1700*sp)
    }
    if (sp<=10){
      return Math.floor(3000*km+2000*sp)
    }
    if (sp>10){
      return Math.floor(3500*km+2500*sp)
    }
  }
  if (km<=5){
    if (sp<=3){
      return Math.floor(2700*km+1500*sp)
    }
    if (sp<=6){
      return Math.floor(2700*km+1800*sp)
    }
    if (sp<=10){
      return Math.floor(2500*km+2500*sp)
    }
    if (sp>10){
      return Math.floor(3000*km+3000*sp)
    }
  }
  return 0;
}