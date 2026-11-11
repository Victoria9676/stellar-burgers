import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';

export const IngredientDetails = (): React.JSX.Element => {
  // TODO: Взять переменную из стора
  const ingredientData = useSelector(
    (state) => state.burgerConstructor.ingredientDetails
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
