import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/auth-slice';
import burgerConstructorReducer from './slices/burger-slice';
import feedReducer from './slices/feed-slice';
import newOrderReducer from './slices/new-order-slice';
import ordersReducer from './slices/profile-slice';
import ingredientsReducer from './slices/slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  orders: ordersReducer,
  auth: authReducer,
  newOrder: newOrderReducer,
});
