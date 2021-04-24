import { Header } from '@main/header';
import { CategoriesList, Category, CreateThread } from '@main/category';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Thread } from '@main/thread';
import { Profile } from '@main/profile';
import { useContext, useEffect, useRef } from 'react';
import { DataContext } from '@contexts';
import { AppBreadcrumbs } from './AppBreadcrumbs';
import { RouteForLogged } from './RouteForLogged';

interface ShellProps {
  logged: boolean | null;
}

export function Shell({ logged }: ShellProps) {
  const { url } = useRouteMatch();
  const { setMainElement } = useContext(DataContext);
  const mainElement = useRef(document.body);

  useEffect(() => {
    setMainElement(mainElement);
  }, [mainElement, mainElement.current]);

  return (
    <main className="board" ref={ mainElement }>
      <Header />
      <AppBreadcrumbs />
      <Switch>
        <Route exact path={ url }>
          <CategoriesList />
        </Route>
        <Route exact path={ `${ url }/category/:categoryId` }>
          <Category />
        </Route>
        <Route exact path={ `${ url }/thread/:threadId` }>
          <Thread />
        </Route>
        <RouteForLogged path={ `${ url }/users/:userId` } logged={ logged }>
          <Profile />
        </RouteForLogged>
        <RouteForLogged path={ `${ url }/category/:categoryId/create-thread` } logged={ logged }>
          <CreateThread />
        </RouteForLogged>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </main>
  );
}
