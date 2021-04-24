import { Redirect, Route, RouteProps } from 'react-router-dom';

interface RouteForLoggedProps extends RouteProps {
  logged: boolean | null;
}

export function RouteForLogged({ path, children, logged }: RouteForLoggedProps) {
  return (
    <Route path={ path }>
      { logged
        ? children
        : <Redirect to="/auth" />
      }
    </Route>
  );
}