import styled from 'styled-components';
import { LoginPanel } from './LoginPanel';

const AuthWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
`;

export function Auth() {
  return (
    <AuthWrapper>
      <LoginPanel />
    </AuthWrapper>
  );
}
