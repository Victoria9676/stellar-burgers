import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { TIngredient, TOrder } from '@utils-types';

type NewOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: NewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null,
};

export const orderBurger = createAsyncThunk(
  'newOrder/orderBurger',
  async (ingredients: TIngredient[]) => {
    const ingredientIds = ingredients.map((ingredient) => ingredient._id);

    const result = await orderBurgerApi(ingredientIds);

    return {
      ...result,
      order: {
        ...result.order,
        ingredients: ingredientIds,
      },
    };
  }
);

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(orderBurger.pending, (state) => {
      state.orderRequest = true;
      state.error = null;
    });

    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload.order;
    });

    builder.addCase(orderBurger.rejected, (state, action) => {
      state.orderRequest = false;
      state.error = action.error.message ?? 'Не удалось оформить заказ';
    });
  },
});

export const { closeOrderModal } = newOrderSlice.actions;

export const selectOrderRequest = (state: RootState): boolean =>
  state.newOrder.orderRequest;

export const selectOrderModalData = (state: RootState): TOrder | null =>
  state.newOrder.orderModalData;

export default newOrderSlice.reducer;
