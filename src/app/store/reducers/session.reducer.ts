import { SessionActions } from '../action-types.enum';
import { AnyAction } from 'redux';
import { SessionState } from '../session-state.interface';

const initialState: SessionState = {
  logged: false,
  session: null,
  currentUser: null,
};

// todo: change AnyAction
export default function session(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SessionActions.LOGIN_SUCCESS: {
      console.log('LOGIN_SUCCESS');
      console.log(action.payload);
      return {
        ...state,
        logged: true,
        session: action.payload,
      };
    }
    case SessionActions.LOGIN_FAIL: {
      console.log('LOGIN_FAIL');
      console.log(action.payload);
      return {
        ...state,
        logged: false,
      };
    }

    case SessionActions.GET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
  }

  return state;
}