import styled from 'styled-components';
import { LoginPanel } from './LoginPanel';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@contexts';
import { LoginForm, RegisterForm } from '@interfaces';
import { Redirect, Route, useHistory, useRouteMatch } from 'react-router-dom';
import { RegisterPanel } from './RegisterPanel';
import { LoginFailResponse } from '@responses';

export function Auth() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { logged, createSession, createAccount } = useContext(SessionContext);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (logged) {
      history.goBack();
    }
  }, []);

  const handleLogin = (form: LoginForm): void => {
    createSession(form).then((result) => {
      if (result.success) {
        history.goBack();
      } else {
        const errors = (result.payload as LoginFailResponse).non_field_errors;
        setLoginError(errors && errors[0] ? errors[0] : 'Unknown error occurred.');
      }
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
        <LoginPanel onLogin={ handleLogin } error={ loginError } />
      </Route>
      <Route path={ `${ url }/register` }>
        <RegisterPanel onRegister={ handleRegister } />
      </Route>
      <Route path="*">
        <Redirect to={ `${ url }/login` } />
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