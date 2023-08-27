export interface searchRoot {
  id: number
  title: string
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
  quantitySold: any
  businessHours: any
  distance: number
  phoneNumber: string
  address: string
  imgRes: string
}
