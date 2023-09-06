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

export interface StoreDetailData {
  id: number
  restaurantName: string
  address: string
  quantitySold: number
  businessHours: number
  distance: number
  detail: string
  phoneNumber: string
  imgRes: string
  foodEntities: foodData[]
}

export interface foodData {
  id: number
  foodName: string
  price: number
  detail: string
  nameRestaurantFood: string
  imgFood: string
  distance: number
  time: number
  star: number
  quantity: number
  createBy?: string
  createAt?: Date
  quantityPurchased: number
  typeFoodEntityId: number
  restaurantEntityId: number
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
