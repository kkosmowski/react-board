import React, { ReactElement, useContext, useEffect, useState } from 'react';
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
    <div className="container">
      { categoriesList }
    </div>);
}