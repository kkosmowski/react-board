import { UserState } from '@store/interfaces';
import { AnyAction } from 'redux';
import { UserActions } from '@store/actions';

const initialState: UserState = {
  createAccountInProgress: false,
  users: [],
  usersLoading: false,
  user: null,
  userLoading: false,
};

export default function user(state = initialState, action: AnyAction): UserState {
  switch (action.type) {
    case UserActions.CREATE_ACCOUNT: {
      return {
        ...state,
        createAccountInProgress: true,
      };
    }

    case UserActions.CREATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        createAccountInProgress: false,
        users: [...state.users, action.payload],
      };
    }

    case UserActions.CREATE_ACCOUNT_FAIL: {
      return {
        ...state,
        createAccountInProgress: false,
      };
    }
  }

  return state;
}