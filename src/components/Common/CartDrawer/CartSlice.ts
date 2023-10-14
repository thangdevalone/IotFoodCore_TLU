import { CartItemData, ToppingEntityList, VoucherItem } from "@/models"
import { handlePriceShip } from "@/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface iDataStore {
  items: CartItemData[]
  name: string
  distance: number
  shipFee?: number
  amount?: number
  id: number
  toppingEntityList?: ToppingEntityList[]
}
export interface CardState {
  totalPrice?: number | undefined
  totalAmount?: number | undefined
  totalShip?: number | undefined
  open: boolean
  lengthFood: number
  dataStore: iDataStore[] | []
  voucherUse: VoucherItem | undefined
  timeDeliver: string
}
const initialState: CardState = {
  totalPrice: undefined,
  open: false,
  totalShip: undefined,
  totalAmount: undefined,
  lengthFood: 0,
  dataStore: [],
  voucherUse: undefined,
  timeDeliver: "12:30 AM",
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart(state) {
      state.totalPrice = undefined
      state.totalShip = undefined
      state.totalAmount = undefined
      state.lengthFood = 0
      state.dataStore = []
      state.voucherUse = undefined
    },
    addVoucherUse(state, action: PayloadAction<VoucherItem>) {
      state.voucherUse = action.payload
    },
    removeVoucherUse(state) {
      state.voucherUse = undefined
    },
    toggleCart(state) {
      state.open = !state.open
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload
    },
    setTimeDeliver(state, action: PayloadAction<string>) {
      state.timeDeliver = action.payload
    },
    setTotalShip(state, action: PayloadAction<number>) {
      state.totalShip = action.payload
    },
    setTotalAmount(state, action: PayloadAction<number>) {
      state.totalAmount = action.payload
    },
    setShipFee(state, action: PayloadAction<{ id: number; shipFee: number }>) {
      state.dataStore[
        state.dataStore.findIndex(
          (data: iDataStore) => data.id === action.payload.id,
        )
      ].shipFee = action.payload.shipFee
    },
    setAmount(state, action: PayloadAction<{ id: number; amount: number }>) {
      state.dataStore[
        state.dataStore.findIndex(
          (data: iDataStore) => data.id === action.payload.id,
        )
      ].amount = action.payload.amount
    },
    setToppingRes(
      state,
      action: PayloadAction<{ id: number; listTopping: ToppingEntityList[] }>,
    ) {
      state.dataStore[
        state.dataStore.findIndex(
          (data: iDataStore) => data.id === action.payload.id,
        )
      ].toppingEntityList = action.payload.listTopping
    },
    addToCart(state, action: PayloadAction<CartItemData>) {
      const { idFood, name, quantity, type, nameStore, idStore, distance } =
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
              distance: distance,
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
            distance: distance,
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
