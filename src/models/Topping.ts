export interface ExpandFood {
  title: string
  require: boolean
  resId: number | undefined
  item:ToppingItem[]|[]
}

export interface ToppingItem {
  idTemp?:number,
  name: string
  price: number
}
