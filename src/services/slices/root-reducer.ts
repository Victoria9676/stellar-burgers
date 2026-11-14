import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth-slice';
import burgerConstructorReducer from './burger-slice';
import feedReducer from './feed-slice';
import ordersReducer from './profile-slice';
import ingredientsReducer from './slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  orders: ordersReducer,
  auth: authReducer,
});
