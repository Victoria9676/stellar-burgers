import { AppHeaderUI } from '@ui';

import { selectUser } from '../../services/slices/auth-slice';
import { useSelector } from '../../services/store';

export const AppHeader = (): React.JSX.Element => {
  const userName = useSelector(selectUser)?.name ?? '';

  return <AppHeaderUI userName={userName} />;
};
