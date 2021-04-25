import { ActionFunction, Dispatch } from '@types';
import { CategoryActions } from './actions.enum';
import { HttpService } from '@services';
import { endpoint, endpointWithProp } from '@utils';
import { CategoryListItemModel, CategoryModel } from '@models';

export function getCategories(): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    dispatch({ type: CategoryActions.GET_CATEGORIES });
    HttpService
      .get(endpoint.categories)
      .then((categories: CategoryListItemModel[]) => {
        dispatch({ type: CategoryActions.GET_CATEGORIES_SUCCESS, payload: categories });
      });
  };
}

export function getCategory(id: number): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    dispatch({ type: CategoryActions.GET_CATEGORY });
    HttpService
      .get(endpointWithProp.category(id))
      .then((category: CategoryModel) => {
        dispatch({ type: CategoryActions.GET_CATEGORY_SUCCESS, payload: category });
      });
  };
}