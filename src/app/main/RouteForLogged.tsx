import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { SessionContext } from '@contexts';

export function RouteForLogged({ path, children }: RouteProps) {
  const { logged } = useContext(SessionContext);

  return (
    <Route path={ path }>
      { logged
        ? children
        : <Redirect to="/auth" />
      }
    </Route>
  );
}