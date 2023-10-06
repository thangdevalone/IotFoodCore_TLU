// reducers/index.js
import cartReducer from '@/components/Common/CartDrawer/CartSlice';
import chatReducer from '@/features/Chat/ChatSlice';
import authReducer from '@/features/auth/AuthSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  cart:cartReducer,
  chat:chatReducer,
  // ...other reducers
  
});

export default rootReducer;
