import { ActionFunction, Dispatch } from '@types';
import { HttpService } from '@services';
import { endpointWithProp, endpointWithQueryParams } from '@utils';
import { PostModel, ThreadModel } from '@models';
import { ThreadActions } from './actions.enum';

export function getThread(threadId: number): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    fetchThread(threadId, dispatch);
    fetchPosts(threadId, dispatch);
  };
}

export function clearThread(): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    dispatch({ type: ThreadActions.CLEAR_THREAD });
  };
}

function fetchThread(threadId: number, dispatch: Dispatch): void {
  dispatch({ type: ThreadActions.GET_THREAD });
  HttpService
    .get(endpointWithProp.thread(threadId),)//session.token)
    .then((thread: ThreadModel) => {
      dispatch({ type: ThreadActions.GET_THREAD_SUCCESS, payload: thread });
    });
}

function fetchPosts(threadId: number, dispatch: Dispatch): void {
  dispatch({ type: ThreadActions.GET_POSTS });
  HttpService
    .get(endpointWithQueryParams.posts(threadId),)//session.token)
    .then((posts: PostModel[]) => {
      dispatch({ type: ThreadActions.GET_POSTS_SUCCESS, payload: posts });
    });
}