export interface RecommendFoodData {
  id: number,
  nameFood: string,
  price: number,
  nameRestaurantFood:string,
  imgFood:string,
  distance: number,
  time: number,
  star: number,
  quantity: number
}

export interface TypeFoodsData {
  id: number,
  nameType: string,
  imgTypeFood?:string,
}