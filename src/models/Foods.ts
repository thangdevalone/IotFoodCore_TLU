export interface RecommendFoodData {
  id: number
  nameFood: string
  price: number
  nameRestaurantFood: string
  imgFood: string
  distance: number
  time: number
  star: number
  quantity: number
}

export interface TypeFoodsData {
  id: number
  nameType: string
  imgFood: string
}

export interface RestaurantData {
  id: number
  foodName: string
  detail: number
  price: number
  star: number
  quantity: number
  timeout: number
  typeFoodEntityId: number,
  quantityPurchased: number,
  restaurantName?: string,
  imgRes?:string
}

export interface StoreDetailData {
  id: 1,
  restaurantName: string,
  address?: string,
  quantitySold: number,
  businessHours?: number,
  distance: number,
  detail: string,
  phoneNumber: string,
  imgRes: string,
  foodEntities : foodEntitiesData[],
}

export interface foodEntitiesData {
  id: number,
  foodName: string,
  detail?: string,
  price: number,
  star: number,
  quantity: number,
  timeout: number,
  quantityPurchased: number,
  typeFoodEntityId: number,
  imgFood: string,
  restaurantEntityId: number,
}