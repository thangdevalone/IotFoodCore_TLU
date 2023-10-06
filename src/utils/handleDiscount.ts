export function handleDiscount(price:number,discount:number,code:string): number {
 if(code.search("K")!==-1){
  return price-discount*1000
 }
 return price - price*discount/100
}
