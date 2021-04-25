import React, { ReactElement, useEffect, useState } from 'react';
import { CategoryListItemModel } from '@models';
import { CategoryListItem } from './CategoryListItem';
import { connect } from 'react-redux';
import { CategoryState, MainStore } from '@store/interfaces';
import { bindActionCreators } from 'redux';
import { Dispatch } from '@types';
import * as categoryActions from '../../store/actions/category.actions';
import { Loader } from '../common/Loader';

interface MergedProps extends CategoryState {
  actions: any;
}

type CategoriesListComponentProps = Pick<MergedProps, 'categories' | 'categoriesLoading' | 'actions'>

function CategoriesListComponent(
  { categories, categoriesLoading, actions }: CategoriesListComponentProps
): ReactElement {
  const [categoriesList, setCategoriesList] = useState<ReactElement[]>([]);

  useEffect(() => {
    actions.getCategories();
  }, [actions]);

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(categoryActions, dispatch)
});

const CategoriesList = connect(mapStateToProps, mapDispatchToProps)(CategoriesListComponent);

export { CategoriesList };