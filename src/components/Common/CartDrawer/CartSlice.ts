import { CartItemData } from "@/models"
import { handlePriceShip } from "@/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface iDataStore {
  items: CartItemData[]
  name: string
  distance:number,
  id: number
}
export interface CardState {
  totalPrice: number
  totalShip:number|undefined
  open: boolean
  lengthFood: number
  dataStore: iDataStore[] | []
  timeDeliver: "10:00 AM" | "11:15 AM" | "12:15 AM"
}
const initialState: CardState = {
  totalPrice: 0,
  open: false,
  totalShip:undefined,
  lengthFood: 0,
  dataStore: [],
  timeDeliver: "11:15 AM",
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.open = !state.open
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload
    },
    setTimeDeliver(
      state,
      action: PayloadAction<"10:00 AM" | "11:15 AM" | "12:15 AM">,
    ) {
      state.timeDeliver = action.payload
    },
    setTotalShip(state,action:PayloadAction<number>){
      state.totalShip=action.payload
    },
    addToCart(state, action: PayloadAction<CartItemData>) {
      const { idFood, name, quantity, type, nameStore, idStore,distance } =
        action.payload
      if (state.dataStore.length) {
        const existingStore = state.dataStore.find(
          (item) => item.name === nameStore && item.id === idStore,
        )
        if (existingStore) {
          const existingFood = existingStore.items.find(
            (item) => item.name === name,
          )
          if (existingFood) {
            if (type === true) {
              state.dataStore
                .find((item) => item.name === nameStore && item.id === idStore)
                ?.items.map((food) => {
                  if (food.idFood === idFood && food.name === name) {
                    state.lengthFood =
                      state.lengthFood - food.quantity + quantity
                    return (food.quantity = quantity)
                  } else {
                    return food.quantity
                  }
                })
            } else {
              state.lengthFood += 1
              state.dataStore
                .find((item) => item.name === nameStore && item.id === idStore)
                ?.items.map((food) =>
                  food.idFood === idFood
                    ? (food.quantity = food.quantity + 1)
                    : food.quantity,
                )
            }
          } else {
            state.lengthFood += 1
            existingStore.items = [...existingStore.items, action.payload]
          }
        } else {
          state.lengthFood += 1
          state.dataStore = [
            ...state.dataStore,
            {
              id: idStore,
              name: nameStore,
              distance:distance,
              items: [action.payload],
            },
          ]
        }
      } else {
        state.lengthFood = 1
        state.dataStore = [
          {
            id: idStore,
            name: nameStore,
            distance:distance,
            items: [action.payload],
          },
        ]
      }
    },
    deleteToCart(state, action: PayloadAction<CartItemData>) {
      const { idFood, name, nameStore, idStore } = action.payload
      state.lengthFood -= 1
      state.dataStore
        .find((store) => store.name === nameStore && store.id === idStore)
        ?.items.map((item) =>
          item.name === name && item.idFood === idFood
            ? (item.quantity = item.quantity - 1)
            : item.quantity,
        )
    },
    removerCart(state, action: PayloadAction<CartItemData>) {
      const { idFood, nameStore, idStore } = action.payload
      state.lengthFood -= 1
      const storeIndex = state.dataStore.findIndex(
        (store) => store.name === nameStore && store.id === idStore,
      )
      if (storeIndex !== -1) {
        const store = state.dataStore[storeIndex].items
        const updatedItems = store.filter((food) => food.idFood !== idFood)
        state.dataStore[storeIndex].items = updatedItems
        if (updatedItems.length === 0) {
          state.dataStore = state.dataStore.filter((item, index) => {
            console.log(index, storeIndex)
            return index !== storeIndex
          })
        }
      }
    },
  },
})

export const cartActions = cartSlice.actions

const cartReducer = cartSlice.reducer
export default cartReducer
