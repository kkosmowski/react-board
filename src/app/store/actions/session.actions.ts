import { HttpService } from '@services';
import { LoginPayload } from '@payloads';
import { endpoint } from '@utils';
import { LoginResponse } from '@responses';
import { SessionActions } from '../action-types.enum';
import { LoginForm, Session } from '@interfaces';
import { Action } from '@interfaces';

export function login(form: LoginForm) {
  return function (dispatch: (action: Action) => void): Promise<boolean> {
    dispatch({ type: SessionActions.LOGIN_STARTED });
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
        } else {
          dispatch({ type: SessionActions.LOGIN_FAIL });
        }
        return !!response.token;
      }).catch((error: Error) => {
        dispatch({ type: SessionActions.LOGIN_FAIL });
        return false;
      });
  };
}