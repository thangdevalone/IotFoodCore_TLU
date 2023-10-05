export function handleDiscount(price:number,discount:number,code:string): number {
 if(code.search("K")){
  return price-discount
 }
 return price - price*discount
}
