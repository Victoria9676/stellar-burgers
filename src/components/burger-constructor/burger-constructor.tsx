import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { selectUser } from '../../services/slices/auth-slice';
import {
  selectConstructorBun,
  selectConstructorIngredients,
} from '../../services/slices/burger-slice';
import {
  orderBurger,
  closeOrderModal,
  selectOrderRequest,
  selectOrderModalData,
} from '../../services/slices/new-order-slice';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);

  const onOrderClick = (): void => {
    if (!bun || orderRequest) return;

    if (!user) {
      void navigate('/login', {
        state: { from: location },
      });
      return;
    }

    void dispatch(orderBurger([bun, ...ingredients, bun]));
  };

  const handleCloseOrderModal = (): void => {
    void dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
