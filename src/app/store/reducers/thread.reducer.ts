import { ThreadState } from '@store/interfaces';
import { AnyAction } from 'redux';
import { ThreadActions } from '@store/actions';

const initialState: ThreadState = {
  postsLoading: false,
  posts: [],
  threadLoading: false,
  thread: null,
  addingReplyInProgress: false,
};

export default function thread(state = initialState, action: AnyAction): ThreadState {
  switch (action.type) {
    case ThreadActions.GET_POSTS: {
      return {
        ...state,
        postsLoading: true,
      };
    }
    case ThreadActions.GET_POSTS_FAIL: {
      return {
        ...state,
        postsLoading: false,
      };
    }

    case ThreadActions.GET_POSTS_SUCCESS: {
      return {
        ...state,
        postsLoading: false,
        posts: action.payload,
      };
    }

    case ThreadActions.GET_THREAD: {
      return {
        ...state,
        threadLoading: true,
      };
    }

    case ThreadActions.GET_THREAD_FAIL: {
      return {
        ...state,
        threadLoading: false,
      };
    }

    case ThreadActions.GET_THREAD_SUCCESS: {
      return {
        ...state,
        threadLoading: false,
        thread: action.payload,
      };
    }

    case ThreadActions.CLEAR_THREAD: {
      return {
        ...state,
        thread: null,
        posts: [],
      };
    }

    case ThreadActions.ADD_REPLY: {
      return {
        ...state,
        addingReplyInProgress: true,
      };
    }

    case ThreadActions.ADD_REPLY_FAIL: {
      return {
        ...state,
        addingReplyInProgress: false,
      };
    }

    case ThreadActions.ADD_REPLY_SUCCESS: {
      return {
        ...state,
        addingReplyInProgress: false,
        posts: [...state.posts, action.payload],
      };
    }
  }

  return state;
}