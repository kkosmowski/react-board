import styled from 'styled-components';
import { LoginPanel } from './LoginPanel';
import { useContext } from 'react';
import { SessionContext } from '@contexts';
import { Redirect } from 'react-router';
import { LoginForm } from '@interfaces';

export function Auth() {
  const { logged, createSession } = useContext(SessionContext);

  const handleLogin = (form: LoginForm) => {
    createSession(form);
  };

  return logged
    ? <Redirect to="/home" />
    : (
      <AuthWrapper>
        <LoginPanel onLogin={ handleLogin } />
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