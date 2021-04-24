import { HttpService } from '@services';
import { LoginPayload } from '@payloads';
import { endpoint, SessionUtil } from '@utils';
import { LoginResponse, MeResponse } from '@responses';
import { SessionActions } from '@store/actions';
import { LoginFormData, Session } from '@interfaces';
import { ActionFunction, Dispatch } from '@types';

export function login(form: LoginFormData): ActionFunction<Promise<boolean>> {
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
          dispatch(loginSuccess(session));
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

export function loginSuccess(session: Session, alreadyPersisted = false): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    dispatch({ type: SessionActions.LOGIN_SUCCESS, payload: session });
    dispatch(getCurrentUser(session));

    if (session.persisted && !alreadyPersisted) {
      dispatch(persistSession(session));
    }
  };
}

export function persistSession(session: Session): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    dispatch({ type: SessionActions.SESSION_PERSISTED });
    SessionUtil.setSession(session);
  };
}

export function logout(): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    dispatch({ type: SessionActions.LOGOUT });
    SessionUtil.clearSession();
  };
}

export function getCurrentUser(session: Session): ActionFunction<Promise<void>> {
  return function (dispatch: Dispatch): Promise<void> {
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

export function checkIfSessionExists(): ActionFunction<void> {
  return function (dispatch: Dispatch): void {
    dispatch({ type: SessionActions.FIND_SESSION });
    const existingSession: Session | null = SessionUtil.checkIfSessionExists();

    if (existingSession) {
      dispatch(loginSuccess(existingSession, true));
    } else {
      dispatch({ type: SessionActions.NO_SESSION_FOUND });
    }
  };
}