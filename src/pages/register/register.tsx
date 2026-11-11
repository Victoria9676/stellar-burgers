import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { register, selectAuthError } from '../../services/slices/auth-slice';

export const Register = (): React.JSX.Element => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    dispatch(
      register({
        name: userName,
        email,
        password
      })
    );
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
