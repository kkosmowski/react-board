import { UserState } from '@store/interfaces';
import { AnyAction } from 'redux';
import { UserActions } from '@store/actions';

const initialState: UserState = {
  users: [],
  usersLoading: false,
  user: null,
  userLoading: false,
};

export default function user(state = initialState, action: AnyAction): UserState {
  switch (action.type) {
    case UserActions.GET_USER: {
      return {
        ...state,
        userLoading: true,
      };
    }

    case UserActions.GET_USER_SUCCESS: {
      return {
        ...state,
        userLoading: false,
        user: action.payload,
      };
    }

    case UserActions.GET_USER_FAIL: {
      return {
        ...state,
        userLoading: false,
      };
    }
  }

  return state;
}