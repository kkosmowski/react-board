import { UsersState } from '@interfaces';
import { AnyAction } from 'redux';
import { UsersActions } from '@store/actions';

const initialState: UsersState = {
  createAccountInProgress: false,
  users: []
};

export default function users(state = initialState, action: AnyAction): UsersState {
  switch (action.type) {
    case UsersActions.CREATE_ACCOUNT: {
      return {
        ...state,
        createAccountInProgress: true,
      };
    }

    case UsersActions.CREATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        createAccountInProgress: false,
        users: [...state.users, action.payload],
      };
    }

    case UsersActions.CREATE_ACCOUNT_FAIL: {
      return {
        ...state,
        createAccountInProgress: false,
      };
    }
  }

  return state;
}