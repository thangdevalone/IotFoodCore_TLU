import { ProductItem } from "."

export interface TypeFoodsData {
  id: number
  nameType: string
  imgType: string
}

export interface RestaurantData {
  id: number
  restaurantName: string
  quantitySold: number
  timeStart:string
  timeClose:string
  distance: number
  imgRes: string
  time: null
  detail: string
  star:number
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
  foodRecommendDtos: foodData[]
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
  nameRestaurantFood: string
  imgFood: string
  createBy: string
  createAt: string
  quantityPurchased: any
  typeFoodEntityId: number
  restaurantEntityId: number
  status: boolean
  distance: number
  toppingEntityList: ToppingEntityList[]
  nameType: string
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
