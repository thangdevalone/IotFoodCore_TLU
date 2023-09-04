import { createSlice ,PayloadAction } from "@reduxjs/toolkit"
import { CartItemData, StoreDetailData } from "@/models";

export interface CardState{
    items: CartItemData[],
    open: boolean,
    dataStore:{name:string,}
}
const initialState:CardState={
    items: [],
    open: false,
    dataStore:null,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        toggleCart(state){
            state.open=!state.open
        },
        setDataStore(state,action:PayloadAction<StoreDetailData>){
            state.dataStore=action.payload
        },
        addToCart(state, action: PayloadAction<CartItemData>) {
            const { idFood, name, quantity, type} = action.payload;
            if (state.items.length) { 
                const existingItem = state.items.find(item => item.idFood === idFood && item.name === name); 
                if (existingItem) {
                    if (type === true) { // update quantity theo input 
                        state.items.map(item => item.idFood === idFood && item.name === name ? item.quantity = quantity : item.quantity); 
                    } else { // neu add them vao cart bang + 
                        state.items.map(item => item.idFood === idFood && item.name === name ? item.quantity = item.quantity + 1 : item.quantity); 
                    }
                } else {
                    state.items = [...state.items, action.payload];
                }
            } else { 
                state.items = [...state.items, action.payload];
            }         
        },
        deleteToCart(state, action: PayloadAction<CartItemData>) { 
            const { idFood, name} = action.payload;
            state.items.map(item => item.idFood === idFood && item.name === name ? item.quantity = item.quantity - 1  : item.quantity); 
        },
        removerCart(state, action: PayloadAction<CartItemData>) {
            const { idFood } = action.payload;
            state.items = state.items.filter(item => item.idFood !== idFood); 
        }
    }
})

export const cartActions = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;