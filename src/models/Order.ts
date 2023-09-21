export interface Order {
  orderStatus: string
  totalAmount: number
  nameRes: string
  shipFee: number
  billFoodRequests: BillFoodRequest[]
}

export interface BillFoodRequest {
  foodId: number
  quantity: number
  itemList: ItemList[]
}

export interface ItemList {
  name: string
  price: number
}
