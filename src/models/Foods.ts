export interface TypeFoodsData {
  id: number
  nameType: string
  imgType: string
}

export interface RestaurantData {
  id: number
  detail: number
  price: number
  star: number
  quantity: number
  timeout: number
  typeFoodEntityId: number
  quantityPurchased: number
  restaurantName: string
  imgRes: string
  distance: number
}
export interface  StoreDetailData  {
  id: number
  createDate: string
  status: boolean
  restaurantName: string
  address: string
  quantitySold: any
  distance: number
  star: number
  timeStart: string
  timeClose: string
  detail: string
  phoneNumber: string
  imgRes: string
  time: any
  toppingEntityList: ToppingEntityList[]
  foodEntities: any[]
}

export interface ToppingEntityList {
  id: number
  createDate: string
  status: boolean
  title: string
  items: string
  requi: boolean
  restaurantEntityId: number
}

export interface foodData {
  id: number
  foodName: string
  price: number
  detail: string
  nameRestaurantFood: string
  imgFood: string
  createBy?: string
  createAt?: Date
  quantityPurchased: number
  typeFoodEntityId: number
  restaurantEntityId: number
  status: boolean | null
}

export interface CartItemData {
  idFood: number
  name: string
  price: number
  quantity: number
  idStore: number
  nameStore: string
  type?: boolean
  imgFood: string
}

export interface FoodRoot {
  totalRow: number
  data: foodData[]
}
