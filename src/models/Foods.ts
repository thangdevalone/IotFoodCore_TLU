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
  restaurantName: string
  quantitySold: number
  businessHours?: number
  distance: number
  phoneNumber: string
  address?: string
  imgRes: string
}
