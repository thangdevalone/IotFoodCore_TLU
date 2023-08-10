// reducers/index.js
import cartReducer from '@/components/Common/CartDrawer/CartSlice';
import authReducer from '@/features/auth/AuthSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  cart:cartReducer
  // ...other reducers
});

export default rootReducer;
