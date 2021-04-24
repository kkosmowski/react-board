import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export function HeaderLoginLinks(): ReactElement {
  return (
    <>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">Register</Link>
    </>
  );
}