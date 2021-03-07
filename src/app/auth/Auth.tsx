import styled from 'styled-components';
import { LoginPanel } from './LoginPanel';
import { useContext, useEffect } from 'react';
import { SessionContext } from '@contexts';
import { LoginForm } from '@interfaces';
import { useHistory } from 'react-router-dom';

export function Auth() {
  const history = useHistory();
  const { logged, createSession } = useContext(SessionContext);

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

  return (
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