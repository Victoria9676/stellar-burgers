import * as React from 'react';
import type { TProtectedRouteProps } from './type';

export const ProtectedRoute = ({ children, onlyUnAuth }: TProtectedRouteProps): React.JSX.Element => {
  // Здесь будет логика проверки авторизации.
  // Пока просто рендерим детей, чтобы убрать ошибку JSX.
  return <>{children}</>;
};
