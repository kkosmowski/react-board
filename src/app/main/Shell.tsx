import { Header } from '@main/header';
import { CategoriesList, Category } from '@main/category';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Thread } from '@main/thread';
import { Profile } from '@main/profile';

export function Shell() {
  const { url } = useRouteMatch();

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={ url }>
          <CategoriesList />
        </Route>
        <Route exact path={ `${ url }/category/:categoryId` }>
          <Category />
        </Route>
        <Route exact path={ `${ url }/category/:categoryId/thread/:threadId` }>
          <Thread />
        </Route>
        <Route path={ `${ url }/users/:userId` }>
          <Profile />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </>
  );
}
