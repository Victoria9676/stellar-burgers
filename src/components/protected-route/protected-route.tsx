import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuthChecked, selectUser } from '../../services/slices/auth-slice';
import { useSelector } from '../../services/store';

import type { TLocationState } from '../../utils/types';
import type { TProtectedRouteProps } from './type';
import type * as React from 'react';

export const ProtectedRoute = ({
  onlyUnAuth,
  children,
}: TProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to="/login" state={{ from: location } as TLocationState} />;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as TLocationState)?.from ?? '/';

    return <Navigate replace to={from} />;
  }
  return <>{children}</>;
};
