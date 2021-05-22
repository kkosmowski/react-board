import { ActionFunction, Dispatch } from '@types';
import { HttpService } from '@services';
import { endpoint, endpointWithProp, endpointWithQueryParams } from '@utils';
import { PostModel, ThreadModel } from '@models';
import { ThreadActions } from './actions.enum';
import { Reply } from '@interfaces';
import store from '@store';

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

export function addReply(reply: Reply): ActionFunction<Promise<void>> {
  const token = store.getState().session.session.token;
  return function (dispatch: Dispatch): Promise<void> {
    dispatch({ type: ThreadActions.ADD_REPLY });
    return HttpService
      .post(endpoint.posts, reply, token)
      .then((post: PostModel) => {
        dispatch({ type: ThreadActions.ADD_REPLY_SUCCESS, payload: post });
      })
      .catch((error: Error) => {
        dispatch({ type: ThreadActions.ADD_REPLY_FAIL });
        console.error(error);
      });
  };
}

interface UpdatePostProps {
  threadId: number;
  postBody: string;
}

export function updatePost({ threadId, postBody }: UpdatePostProps): ActionFunction<Promise<void>> {
  const token = store.getState().session.session.token;
  return function (dispatch: Dispatch): Promise<void> {
    dispatch({ type: ThreadActions.UPDATE_POST });
    return HttpService
      // @todo: find out whether it should be patch and get the endpoint details
      .patch(endpointWithProp.post(threadId), postBody, token)
      .then((post: PostModel) => {
        dispatch({ type: ThreadActions.UPDATE_POST_SUCCESS, payload: post });
      })
      .catch((error: Error) => {
        dispatch({ type: ThreadActions.UPDATE_POST_FAIL });
        console.error(error);
      });
  };

}

function fetchThread(threadId: number, dispatch: Dispatch): void {
  dispatch({ type: ThreadActions.GET_THREAD });
  HttpService
    .get(endpointWithProp.thread(threadId))
    .then((thread: ThreadModel) => {
      dispatch({ type: ThreadActions.GET_THREAD_SUCCESS, payload: thread });
    })
    .catch((error: Error) => {
      dispatch({ type: ThreadActions.GET_THREAD_FAIL });
      console.error(error);
    });
}

function fetchPosts(threadId: number, dispatch: Dispatch): void {
  dispatch({ type: ThreadActions.GET_POSTS });
  HttpService
    .get(endpointWithQueryParams.posts(threadId))
    .then((posts: PostModel[]) => {
      dispatch({ type: ThreadActions.GET_POSTS_SUCCESS, payload: posts });
    })
    .catch((error: Error) => {
      dispatch({ type: ThreadActions.GET_POSTS_FAIL });
      console.error(error);
    });
}