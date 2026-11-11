import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  selectProfileOrders,
  selectProfileOrdersError,
  selectProfileOrdersLoading
} from '../../services/slices/profile-slice';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const orders=useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);
  const error = useSelector(selectProfileOrdersError);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
