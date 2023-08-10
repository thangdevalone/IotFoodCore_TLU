// reducers/index.js
import authReducer from '@/features/auth/AuthSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  // ...other reducers
});

export default rootReducer;
