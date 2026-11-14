import { BurgerIngredientUI } from '@ui';
import { memo } from 'react';

import { addBun, addIngredient } from '../../services/slices/burger-slice';
import { useDispatch } from '../../services/store';

import type { TBurgerIngredientProps } from './type';

export const BurgerIngredient = memo(function BurgerIngredient({
  ingredient,
  count,
}: TBurgerIngredientProps): React.JSX.Element {
  const dispatch = useDispatch();

  const handleAdd = (): void => {
    if (ingredient.type === 'bun') {
      dispatch(addBun(ingredient));
    } else {
      dispatch(addIngredient(ingredient));
    }
  };

  return (
    <BurgerIngredientUI ingredient={ingredient} count={count} handleAdd={handleAdd} />
  );
});
