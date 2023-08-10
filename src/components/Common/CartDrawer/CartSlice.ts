import { createSlice } from "@reduxjs/toolkit"

export interface CardState{
    open:boolean
}
const initialState:CardState={
    open:false
}

const cartSlice= createSlice({
    name:"cart",
    initialState,
    reducers:{
        toggleCart(state){
            state.open=!state.open
        }
    }
})
export const cartActions=cartSlice.actions

const cartReducer=cartSlice.reducer
export default cartReducer