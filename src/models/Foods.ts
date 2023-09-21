import { ProductItem } from "."

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
  quantitySold: any
  distance: number
  star: number
  timeStart: string
  timeClose: string
  detail: string
  imgRes: string
  toppingEntityList: ToppingEntityList[]
  foodRecommendDtos: ProductItem[]
}

export interface ToppingEntityList {
  id: number
  itemList: ItemToppingEntity[]
  status: boolean
  title: string
  requi: boolean
  restaurantEntityId: number
}

export interface ItemToppingEntity{
  name:string
  price:number
}
export interface foodData {
  id: number
  foodName: string
  price: number
  detail: string
  distance:number
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
  distance:number
  nameStore: string
  type?: boolean
  imgFood: string
}

export interface FoodRoot {
  totalRow: number
  data: foodData[]
}
