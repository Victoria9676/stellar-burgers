import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/slice';
import burgerConstructorReducer from './slices/burger-slice';
import feedReducer from './slices/feed-slice';
import ordersReducer from './slices/profile-slice';

// TODO: Заменить на настоящий корневой редьюсер
export const rootReducer = combineReducers({
  // TODO: Собрать здесь редьюсеры слайсов
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  orders: ordersReducer
});
