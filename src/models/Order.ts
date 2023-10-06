import { BillFoodRequest } from "."

export interface Order {
  orderStatus: string
  totalAmount: number
  nameRes: string
  shipFee: number
  billFoodRequests: BillFoodRequest[]
}


