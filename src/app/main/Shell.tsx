import { Header } from '@main/header';
import { CategoriesList, Category, CreateThread } from '@main/category';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Thread } from '@main/thread';
import { Profile } from '@main/profile';
import { useContext, useEffect, useRef } from 'react';
import { DataContext } from '@contexts';
import { AppBreadcrumbs } from './AppBreadcrumbs';
import { RouteForLogged } from './RouteForLogged';
import { MainStore, SessionState } from '@interfaces';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as sessionActions from '../store/actions/session.actions';

interface MergedProps extends SessionState {
  actions: any;
}

type ShellComponentProps = Pick<MergedProps, 'logged'>;

function ShellComponent({ logged }: ShellComponentProps) {
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

const mapStateToProps = ({ session }: MainStore) => ({
  logged: session.logged,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

const Shell = connect(mapStateToProps, mapDispatchToProps)(ShellComponent);

export { Shell };