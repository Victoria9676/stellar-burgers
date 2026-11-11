import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/slice';
import burgerConstructorReducer from './slices/burger-slice';
import feedReducer from './slices/feed-slice';
import ordersReducer from './slices/profile-slice';
import authReducer from './slices/auth-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  orders: ordersReducer,
  auth: authReducer,
});
