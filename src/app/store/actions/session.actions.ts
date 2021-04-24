import { HttpService } from '@services';
import { LoginPayload } from '@payloads';
import { endpoint } from '@utils';
import { LoginResponse, MeResponse } from '@responses';
import { SessionActions } from '@store';
import { LoginForm, Session } from '@interfaces';
import { Action } from '@interfaces';
import { Dispatch } from '@types';
import { ActionFunction } from '../../domain/interfaces/action-function.interface';

export function login(form: LoginForm): ActionFunction<Promise<boolean>> {
  return function (dispatch: Dispatch): Promise<boolean> {
    dispatch({ type: SessionActions.LOGIN });
    return HttpService
      .post<LoginPayload>(endpoint.login, {
        username: form.email,
        password: form.password,
      }).then((response: LoginResponse) => {
        if (response.token) {
          const session: Session = {
            token: response.token,
            email: form.email,
            persisted: form.remember,
          };
          dispatch({ type: SessionActions.LOGIN_SUCCESS, payload: session });
          dispatch(getCurrentUser(session));
        } else {
          dispatch({ type: SessionActions.LOGIN_FAIL });
        }
        return !!response.token;
      }).catch(() => {
        dispatch({ type: SessionActions.LOGIN_FAIL });
        return false;
      });
  };
}

export function logout(): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    dispatch({ type: SessionActions.LOGOUT});
  }
}

export function getCurrentUser(session: Session): ActionFunction<Promise<void>> {
  return function (dispatch: (action: Action) => void): Promise<void> {
    dispatch({ type: SessionActions.GET_CURRENT_USER });
    return HttpService
      .get(endpoint.me, session.token)
      .then((data: MeResponse) => {
        dispatch({
          type: SessionActions.GET_CURRENT_USER_SUCCESS,
          payload: {
            id: data.id,
            username: data.username,
            email: session.email,
            role: data.role
          }
        });
      });
  };
}