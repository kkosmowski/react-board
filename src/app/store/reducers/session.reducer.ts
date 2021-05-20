import { SessionActions } from '@store/actions';
import { AnyAction } from 'redux';
import { SessionState } from '@store/interfaces';

const initialState: SessionState = {
  logged: null,
  loginInProgress: false,
  session: null,
  currentUser: null,
  currentUserLoading: false,
  createAccountInProgress: false,
};

// todo: change AnyAction
export default function session(state = initialState, action: AnyAction): SessionState {
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

    case SessionActions.NO_SESSION_FOUND: {
      return {
        ...state,
        logged: false,
      };
    }

    case SessionActions.GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUserLoading: false,
        currentUser: action.payload,
      };
    }

    case SessionActions.CREATE_ACCOUNT: {
      return {
        ...state,
        createAccountInProgress: true,
      };
    }

    case SessionActions.CREATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        createAccountInProgress: false,
      };
    }

    case SessionActions.CREATE_ACCOUNT_FAIL: {
      return {
        ...state,
        createAccountInProgress: false,
      };
    }

    default:
      return state;
  }
}