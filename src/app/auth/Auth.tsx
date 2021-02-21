import styled from 'styled-components';
import { LoginPanel } from './LoginPanel';

export function Auth() {
  return (
    <AuthWrapper>
      <LoginPanel />
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