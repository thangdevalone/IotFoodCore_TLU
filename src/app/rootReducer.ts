// reducers/index.js
import cartReducer from '@/components/Common/CartDrawer/CartSlice';
import adminReducer from '@/features/Admin/AdminSlice';
import authReducer from '@/features/auth/AuthSlice';
import ChatBoxReducer from '@/features/ChatBoxs/MessageSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  cart:cartReducer,
  chatBox:ChatBoxReducer,
  admin:adminReducer
  // ...other reducers
});

export default rootReducer;
