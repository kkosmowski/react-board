import { Header } from '@main/header';
import { CategoriesList, Category } from '@main/category';
import { Route, useRouteMatch } from 'react-router-dom';

export function Shell() {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Route path={ match.url } component={ CategoriesList } exact />
      <Route path={ match.url + '/category/:categoryId' } component={ Category } />
    </>
  );
}
