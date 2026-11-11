import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { orderBurger, closeOrderModal } from '../../services/slices/burger-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const orderRequest = useSelector((state) => state.burgerConstructor.orderRequest);
  const orderModalData = useSelector((state) => state.burgerConstructor.orderModalData);
  const user = useSelector((state) => state.auth.user);

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', {
        state: {
          from: '/',
        },
      });
      return;
    }

    dispatch(
      orderBurger([
        constructorItems.bun,
        ...constructorItems.ingredients,
        constructorItems.bun,
      ])
    );
  };

  const handleCloseOrderModal = (): void => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
