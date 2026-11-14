import ingredientsReducer, { getIngredients } from '../slice';

import type { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
  _id: 'bun-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'i',
  image_large: 'il',
  image_mobile: 'im',
};

const initialState = { ingredients: [], isLoading: false, error: null };

describe('ingredients reducer', () => {
  it('неизвестный экшен: при undefined возвращает начальное состояние', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('getIngredients.pending включает загрузку и сбрасывает ошибку', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredients.pending('test-request-id', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('getIngredients.fulfilled записывает ингредиенты и выключает загрузку', () => {
    const started = ingredientsReducer(
      undefined,
      getIngredients.pending('test-request-id', undefined)
    );
    const state = ingredientsReducer(
      started,
      getIngredients.fulfilled([mockIngredient], 'test-request-id', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual([mockIngredient]);
  });

  it('getIngredients.rejected записывает ошибку и выключает загрузку', () => {
    const started = ingredientsReducer(
      undefined,
      getIngredients.pending('test-request-id', undefined)
    );
    const state = ingredientsReducer(
      started,
      getIngredients.rejected(new Error('Ошибка сети'), 'test-request-id', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка сети');
  });
});
