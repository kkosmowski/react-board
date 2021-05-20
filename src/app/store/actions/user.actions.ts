import { ActionFunction, Dispatch } from '@types';
import { UserActions } from '@store/actions';
import { HttpService } from '@services';
import { endpointWithProp } from '@utils';
import { User } from '@models';
import store from '@store';

export function getUser(userId: number): ActionFunction<Promise<void>> {
  const token = store.getState().session.session.token;
  return function (dispatch: Dispatch): Promise<void> {
    dispatch({ type: UserActions.GET_USER });
    return HttpService
      .get(endpointWithProp.user(userId), token)
      .then((response: User) => {
        dispatch({ type: UserActions.GET_USER_SUCCESS, payload: response });
      }).catch((error: Error) => {
        dispatch({ type: UserActions.GET_USER_FAIL });
        console.error(error);
      });
  };
}