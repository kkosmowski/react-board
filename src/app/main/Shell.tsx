import { Header } from '@main/header';
import { CategoriesList, Category, CreateThread } from '@main/category';
import { Redirect, Route, Switch, useLocation, useRouteMatch, withRouter } from 'react-router-dom';
import { Thread } from '@main/thread';
import { Profile } from '@main/profile';
import { useContext, useEffect, useRef } from 'react';
import { DataContext } from '@contexts';
import { Breadcrumbs } from './Breadcrumbs';
import { RouteForLogged } from './RouteForLogged';
import { CategoryState, MainStore, SessionState } from '@store/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from '@types';
import { bindActionCreators } from 'redux';
import * as categoryActions from '../store/actions/category.actions';
import { BreadcrumbsService } from '@services';

interface MergedProps extends SessionState, CategoryState {
  categoryActions: any;
}

type ShellComponentProps = Pick<MergedProps, 'logged' | 'categoryActions'>;

function ShellComponent({ logged, categoryActions }: ShellComponentProps) {
  const location = useLocation();
  const { url } = useRouteMatch();
  const { setMainElement } = useContext(DataContext);
  const mainElement = useRef(document.body);

  useEffect(() => {
    categoryActions.getCategories().then((() => {
      BreadcrumbsService.setBreadcrumbs(location.pathname);
    }));
  }, []);

  useEffect(() => {
    setMainElement(mainElement);
  }, [mainElement, mainElement.current]);

  return (
    <main className="board" ref={ mainElement }>
      <Header />
      <Breadcrumbs />
      <Switch>
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
        <Route exact path={ url }>
          <CategoriesList />
        </Route>
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
  categoryActions: bindActionCreators(categoryActions, dispatch),
});

const Shell = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShellComponent));

export { Shell };