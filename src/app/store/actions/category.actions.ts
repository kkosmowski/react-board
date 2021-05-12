import { ActionFunction, Dispatch } from '@types';
import { CategoryActions, ThreadActions } from './actions.enum';
import { HttpService } from '@services';
import { endpoint, endpointWithProp, endpointWithQueryParams } from '@utils';
import { CategoryListItemModel, CategoryModel, ThreadModel } from '@models';

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

export function getCategory(categoryId: number): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    fetchCategory(categoryId, dispatch);
    fetchThreads(categoryId, dispatch);
  };
}

export function clearCategory(): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    dispatch({ type: CategoryActions.CLEAR_CATEGORY });
  };
}

function fetchCategory(categoryId: number, dispatch: Dispatch): void {
  dispatch({ type: CategoryActions.GET_CATEGORY });
  HttpService
    .get(endpointWithProp.category(categoryId))
    .then((category: CategoryModel) => {
      dispatch({ type: CategoryActions.GET_CATEGORY_SUCCESS, payload: category });
    });
}

function fetchThreads(categoryId: number, dispatch: Dispatch): void {
  dispatch({ type: CategoryActions.GET_THREADS });
  HttpService
    .get(endpointWithQueryParams.threads(categoryId),)//session.token)
    .then((threads: ThreadModel[]) => {
      dispatch({ type: CategoryActions.GET_THREADS_SUCCESS, payload: threads });
    });
}