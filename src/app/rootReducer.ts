// reducers/index.js
import appReducer from '@/appSlice';
import cartReducer from '@/components/Common/CartDrawer/CartSlice';
import chatReducer from '@/features/Chat/ChatSlice';
import authReducer from '@/features/auth/AuthSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  cart:cartReducer,
  chat:chatReducer,
  app:appReducer,
  // ...other reducers
  
});

export default rootReducer;
