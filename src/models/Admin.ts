
export interface searchRoot{
  id:number,
  title:string
}

export interface ProductRoot {
  totalRow: number
  data: ProductItem[]
}

export interface ProductItem {
  id: number
  foodName: string
  price: number
  detail: string | null
  nameRestaurantFood: string
  imgFood: string
  distance: string | null
  time: number
  star: number
  quantity: number
  createBy: string | null
  createAt: string | null
  quantityPurchased: number
  typeFoodEntityId: number
  restaurantEntityId: number,
  status:boolean|null
}
export interface EmployeeItem {
  id: number
  nameEmployee: string
  password: string
  position: string // Chức vụ
  // avatar: string
  action:boolean|null
  phoneNumber:string 
  employeeNumber:string // Mã nhân viên
}
