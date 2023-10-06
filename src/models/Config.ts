export type PageConfig={
  pageSize:number
  pageIndex:number
}
export interface BillConfig {
  totalAmount: number
  shipFee: number
  note?:string
  codeVoucher?: string
  billFoodRequests: BillFoodRequest[]
}

export interface BillFoodRequest {
  foodId: number
  quantity: number
  itemList?: ItemList[]
}

export interface ItemList {
  name: string
  price: number
}
