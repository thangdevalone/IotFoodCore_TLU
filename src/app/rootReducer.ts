// reducers/index.js
import cartReducer from '@/components/Common/CartDrawer/CartSlice';
import adminReducer from '@/features/Admin/AdminSlice';
import chatReducer from '@/features/Chat/ChatSlice';
import authReducer from '@/features/auth/AuthSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  cart:cartReducer,
  chat:chatReducer,
  admin:adminReducer
  // ...other reducers
  
});

export default rootReducer;
