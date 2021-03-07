import { ReactElement } from 'react';
import styled from 'styled-components';
import { Card, CardActions, CardContent } from '@material-ui/core';

interface AuthPanelProps {
  children: ReactElement[];
}

export function AuthPanel({ children }: AuthPanelProps): ReactElement {
  const [content, actions]: ReactElement[] = children;
  return (
    <AuthCard>
      <AuthCardContent>
        { content }
      </AuthCardContent>
      <AuthCardActions>
        { actions }
      </AuthCardActions>
    </AuthCard>
  );
}


const AuthCard = styled(Card)`
  width: 320px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const AuthCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AuthCardActions = styled(CardActions)`
  display: flex;
  flex-direction: column;
  width: 100%;

  && > :not(:first-child) {
    margin-left: 0;
    margin-top: 8px;
  }
`;