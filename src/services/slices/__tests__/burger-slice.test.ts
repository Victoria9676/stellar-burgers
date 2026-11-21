import burgerReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown,
} from '../burger-slice';
import { orderBurger } from '../new-order-slice';

import type { TIngredient, TOrder } from '@utils-types';

const bun: TIngredient = {
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

const main: TIngredient = {
  _id: 'main-1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 3244,
  image: 'i',
  image_large: 'il',
  image_mobile: 'im',
};

const initialState = { bun: null, ingredients: [] };

describe('burgerConstructor reducer', () => {
  it('неизвестный экшен: при undefined возвращает начальное состояние', () => {
    const state = burgerReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('addBun добавляет булку с уникальным id', () => {
    const state = burgerReducer(undefined, addBun(bun));
    expect(state.bun).toMatchObject(bun);
    expect(typeof state.bun?.id).toBe('string');
    expect(state.ingredients).toEqual([]);
  });

  it('addBun заменяет предыдущую булку', () => {
    const state = burgerReducer(undefined, addBun(bun));
    const second = { ...bun, _id: 'bun-2', name: 'Флюоресцентная булка R2-D3' };
    const nextState = burgerReducer(state, addBun(second));
    expect(nextState.bun).toMatchObject(second);
    expect(nextState.bun?.id).not.toBe(state.bun?.id);
  });

  it('addIngredient добавляет начинку в конец списка', () => {
    let state = burgerReducer(undefined, addIngredient(bun));
    state = burgerReducer(state, addIngredient(main));
    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0]._id).toBe('bun-1');
    expect(state.ingredients[1]._id).toBe('main-1');
  });

  it('removeIngredient удаляет начинку по id', () => {
    let state = burgerReducer(undefined, addIngredient(main));
    const targetId = state.ingredients[0].id;
    state = burgerReducer(state, addIngredient({ ...main, _id: 'main-2' }));
    state = burgerReducer(state, removeIngredient(targetId));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main-2');
  });

  it('moveIngredientUp меняет начинку местами с предыдущей', () => {
    let state = burgerReducer(undefined, addIngredient(main));
    state = burgerReducer(
      state,
      addIngredient({ ...main, _id: 'sauce-1', name: 'Соус Spicy-X' })
    );
    state = burgerReducer(state, moveIngredientUp(1));
    expect(state.ingredients[0]._id).toBe('sauce-1');
    expect(state.ingredients[1]._id).toBe('main-1');
  });

  it('moveIngredientDown меняет начинку местами со следующей', () => {
    let state = burgerReducer(undefined, addIngredient(main));
    state = burgerReducer(
      state,
      addIngredient({ ...main, _id: 'sauce-1', name: 'Соус Spicy-X' })
    );
    state = burgerReducer(state, moveIngredientDown(0));
    expect(state.ingredients[0]._id).toBe('sauce-1');
    expect(state.ingredients[1]._id).toBe('main-1');
  });

  it('moveIngredientUp на первой позиции ничего не меняет', () => {
    let state = burgerReducer(undefined, addIngredient(main));
    const before = [...state.ingredients];
    state = burgerReducer(state, moveIngredientUp(0));
    expect(state.ingredients).toEqual(before);
  });

  it('clearConstructor очищает конструктор', () => {
    let state = burgerReducer(undefined, addBun(bun));
    state = burgerReducer(state, addIngredient(main));
    state = burgerReducer(state, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('orderBurger.fulfilled очищает конструктор', () => {
    const payloadOrder: TOrder = {
      _id: 'order-1',
      ingredients: ['bun-1', 'main-1'],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      number: 12345,
      createdAt: '2026-11-14T10:00:00.000Z',
      updatedAt: '2026-11-14T10:00:00.000Z',
    };

    let state = burgerReducer(undefined, addBun(bun));
    state = burgerReducer(state, addIngredient(main));

    const action = orderBurger.fulfilled(
      {
        success: true,
        name: 'Краторный био-марсианский бургер',
        order: payloadOrder,
      },
      'test-request-id',
      [bun, main]
    );

    state = burgerReducer(state, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
