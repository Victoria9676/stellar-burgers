import { ProfileMenuUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/slices/auth-slice';

export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
