import { Role } from "."

export interface searchRoot {
  id: number
  title: string
}

export interface ProductRoot {
  totalRow: number
  data: ProductItem[]
}
export interface VoucherRoot {
  totalRow: number
  data: VoucherItem[]
}
export interface EmployeeRoot {
  totalRow: number
  data: EmployeeItem[]
}

export interface RestaurantRoot {
  totalRow: number
  responList: TypeRestaurant[]
}

export interface ProductItem {
  id: number
  foodName: string
  price: number
  detail: string | null
  nameRestaurantFood: string
  imgFood: string
  distance: number | null
  time: number
  star: number
  quantity: number
  createBy: string | null
  createAt: string | null
  quantityPurchased: number
  typeFoodEntityId: number
  restaurantEntityId: number
  status: boolean | null
}

export interface TypeRoot {
  data: TypeItem[]
  totalRow: number
}
export interface TypeItem {
  id: number
  imgType: string | null
  nameType: string
  status: string | null
}

export interface TypeRestaurant {
  id: number
  restaurantName: string
  quantitySold: number
  timeStart: string
  timeClose: string
  distance: number
  phoneNumber: string
  address: string
  imgRes: string
  time: null
  detail: string
  star: number
}
export interface EmployeeItem {
  id: number
  role: Role[]
  token: any
  sdt: string
  accountName: string
  imgUser: string
  msv: string
}
export interface VoucherItem {
  id?: number
  createDate?: string
  status?: boolean
  discount: number
  expired: string
  detail: string
  code: string
  quantity: number
  title: string
}
export interface RoleUser {
  id: number
  createDate: any
  status: any
  authority: string
}

export interface UserItem {
  id: number
  role: RoleUser[]
  token: any
  sdt: string
  accountName: string
  imgUser: string
  msv: string
}

export interface UserRoot {
  totalRow: number
  loginResponDtos: EmployeeItem[]
}

export interface InvoiceRoot {
  totalRow: number
  data: Invoice[]
}
export interface Invoice {
  id: number
  createAt: string
  orderStatus: string
  nameRestaurant: string
  shipFee: number
  finishTime: any
  foodResponseBills: FoodResponseBill[]
}

export interface FoodResponseBill {
  foodId: number
  nameFood: string
  priceFood: number
  quantity: number
  nameRes: string
  resId: number
  itemList: ItemTopping[]
}

export interface ItemTopping {
  name: string
  price: number
}
export interface VoucherResponseBill {
  code: string
  discount: number
  expired: string
  createDate: string
}
export interface BillUser {
  id: number
  createAt: string
  orderStatus: "PENDING"| "PROCESSING"|"DELIVERED"|"CANCELED"
  nameRestaurant: any
  shipFee: number
  finishTime: any
  accountId: number
  totalAmount: number
  note: string
  voucherResponseBill: VoucherResponseBill
  foodResponseBills: FoodResponseBill[]
}

export interface RootBillUser {
  totalRow: number
  data: BillUser[]
}
