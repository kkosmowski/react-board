import React, { ReactElement, useEffect, useState } from 'react';
import { CategoryListItemModel } from '@models';
import { CategoryListItem } from './CategoryListItem';
import { connect } from 'react-redux';
import { CategoryState, MainStore } from '@store/interfaces';
import { Loader } from '../common/Loader';

type CategoriesListComponentProps = Pick<CategoryState, 'categories' | 'categoriesLoading'>

function CategoriesListComponent(
  { categories, categoriesLoading }: CategoriesListComponentProps
): ReactElement {
  const [categoriesList, setCategoriesList] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (categories) {
      const list: ReactElement[] = categories.map((category: CategoryListItemModel) =>
        (<CategoryListItem category={ category } key={ category.id } />)
      );
      setCategoriesList(list);
    }
  }, [categories]);

  return (
    <div className="root-container">
      { categoriesLoading ? <Loader centered size="64px" /> : categoriesList }
    </div>
  );
}

const mapStateToProps = ({ category }: MainStore) => ({
  categories: category.categories,
  categoriesLoading: category.categoriesLoading,
});

const CategoriesList = connect(mapStateToProps)(CategoriesListComponent);

export { CategoriesList };