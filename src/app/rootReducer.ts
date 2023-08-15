// reducers/index.js
import cartReducer from '@/components/Common/CartDrawer/CartSlice';
import authReducer from '@/features/auth/AuthSlice';
import ChatBoxReducer from '@/features/Chat/ChatBoxs/MessageSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  chatBox: ChatBoxReducer
  // ...other reducers
});

export default rootReducer;
