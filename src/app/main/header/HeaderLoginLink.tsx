import { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export function HeaderLoginLink(): ReactElement {
  return (
    <RouterLink to="/auth">Login</RouterLink>
  );
}