import { ActionFunction, Dispatch } from '@types';
import { CategoryActions, ThreadActions } from './actions.enum';
import { HttpService } from '@services';
import { endpoint, endpointWithProp, endpointWithQueryParams } from '@utils';
import { CategoryListItemModel, CategoryModel, ThreadModel } from '@models';
import { NewThread } from '@interfaces';
import store from '@store';

export function getCategories(): ActionFunction<Promise<any>> {
  return function (dispatch: Dispatch): Promise<any> {
    dispatch({ type: CategoryActions.GET_CATEGORIES });
    return HttpService
      .get(endpoint.categories)
      .then((categories: CategoryListItemModel[]) => {
        dispatch({ type: CategoryActions.GET_CATEGORIES_SUCCESS, payload: categories });
      })
      .catch((error: Error) => {
        dispatch({ type: CategoryActions.GET_CATEGORIES_FAIL });
        console.error(error);
      });
  };
}

export function createThread(thread: NewThread): ActionFunction<Promise<ThreadModel | void>> {
  const token = store.getState().session.session.token;
  return function (dispatch: Dispatch): Promise<ThreadModel | void> {
    dispatch({ type: CategoryActions.CREATE_THREAD });
    return HttpService
      .post<NewThread>(endpoint.threads, thread, token)
      .then((thread: ThreadModel) => {
        dispatch({ type: CategoryActions.CREATE_THREAD_SUCCESS });
        dispatch({ type: ThreadActions.GET_THREAD_SUCCESS, payload: thread });
        return thread;
      })
      .catch((error: Error) => {
        dispatch({ type: CategoryActions.CREATE_THREAD_FAIL });
        console.error(error);
      })
  }
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
    })
    .catch((error: Error) => {
      dispatch({ type: CategoryActions.GET_CATEGORY_FAIL });
      console.error(error);
    });
}

function fetchThreads(categoryId: number, dispatch: Dispatch): void {
  dispatch({ type: CategoryActions.GET_THREADS });
  HttpService
    .get(endpointWithQueryParams.threads(categoryId),)//session.token)
    .then((threads: ThreadModel[]) => {
      dispatch({ type: CategoryActions.GET_THREADS_SUCCESS, payload: threads });
    })
    .catch((error: Error) => {
      dispatch({ type: CategoryActions.GET_THREADS_FAIL });
      console.error(error);
    });
}