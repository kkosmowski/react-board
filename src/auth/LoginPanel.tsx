import React from 'react';
import {Card} from '@material-ui/core';
import styled from 'styled-components';

const AuthCard = styled(Card)`
  width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

export function LoginPanel() {
  return (
    <AuthCard>
      auth
    </AuthCard>
  );
}
