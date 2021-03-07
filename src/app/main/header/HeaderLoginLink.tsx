import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export function HeaderLoginLink(): ReactElement {
  return (
    <Link to="/auth">Login</Link>
  );
}