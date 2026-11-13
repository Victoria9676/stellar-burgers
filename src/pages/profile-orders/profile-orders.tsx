import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import {
  getOrders,
  selectProfileOrders,
  selectProfileOrdersError,
  selectProfileOrdersLoading,
} from '../../services/slices/profile-slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);
  const error = useSelector(selectProfileOrdersError);

  useEffect(() => {
    void dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className="text text_type_main-medium mt-10 mb-10">
        Не удалось загрузить историю заказов. Попробуйте позже.
      </p>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
