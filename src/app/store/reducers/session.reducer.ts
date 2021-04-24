import { SessionActions } from '../action-types.enum';
import { AnyAction } from 'redux';
import { SessionState } from '../session-state.interface';

const initialState: SessionState = {
  logged: false,
  loginInProgress: false,
  session: null,
  currentUser: null,
  currentUserLoading: false,
};

// todo: change AnyAction
export default function session(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SessionActions.LOGIN: {
      return {
        ...state,
        loginInProgress: true,
      };
    }

    case SessionActions.LOGIN_SUCCESS: {
      return {
        ...state,
        logged: true,
        loginInProgress: false,
        session: action.payload,
      };
    }

    case SessionActions.LOGIN_FAIL: {
      return {
        ...state,
        logged: false,
        loginInProgress: false,
      };
    }

    case SessionActions.LOGOUT: {
      return {
        ...state,
        logged: false,
        session: null,
        currentUser: null,
      };
    }

    case SessionActions.GET_CURRENT_USER: {
      return {
        ...state,
        currentUserLoading: true,
      };
    }

    case SessionActions.GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUserLoading: false,
        currentUser: action.payload,
      };
    }

    default:
      return state;
  }
}