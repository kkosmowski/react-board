import styled from 'styled-components';
import { LoginPanel } from './LoginPanel';
import { useContext, useEffect } from 'react';
import { SessionContext } from '@contexts';
import { LoginForm, RegisterForm } from '@interfaces';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { RegisterPanel } from './RegisterPanel';

export function Auth() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { logged, createSession, createAccount } = useContext(SessionContext);

  useEffect(() => {
    if (logged) {
      history.goBack();
    }
  }, []);

  const handleLogin = (form: LoginForm): void => {
    createSession(form).then(() => {
      history.goBack();
    });
  };

  const handleRegister = (form: RegisterForm): void => {
    createAccount(form).then(() => {
      history.push('/home');
      // TODO: Add something more after registration is successful
    });
  };

  return (
    <AuthWrapper>
      <Route path={ `${ url }/login` }>
        <LoginPanel onLogin={ handleLogin } />
      </Route>
      <Route path={ `${ url }/register` }>
        <RegisterPanel onRegister={ handleRegister } />
      </Route>
    </AuthWrapper>
  );
}

const AuthWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
`;