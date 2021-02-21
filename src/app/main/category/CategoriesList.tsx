import { ReactElement, useContext, useEffect, useState } from 'react';
import { CategoryListItemModel } from '@models';
import { CategoryListItem } from './CategoryListItem';
import { DataContext } from '@contexts';
import styled from 'styled-components';

export function CategoriesList(): ReactElement {
  const { categories, getCategories } = useContext(DataContext);
  const [categoriesList, setCategoriesList] = useState<ReactElement[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories) {
      const list: ReactElement[] = [];

      categories.forEach((category: CategoryListItemModel) => {
        list.push(<CategoryListItem category={ category } key={ category.id } />);
      });

      setCategoriesList(list);
    }
  }, [categories]);

  return (
    <List>
      { categoriesList }
    </List>);
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;
  margin: 64px auto;
`;