import { CategoryState } from '@store/interfaces';
import { AnyAction } from 'redux';
import { CategoryActions } from '@store/actions';

const initialState: CategoryState = {
  categoriesLoading: false,
  categories: [],
  categoryLoading: false,
  category: null,
  threadsLoading: false,
  threads: [],
};

export default function category(state = initialState, action: AnyAction): CategoryState {
  switch (action.type) {
    case CategoryActions.GET_CATEGORIES: {
      return {
        ...state,
        categoriesLoading: true,
      };
    }

    case CategoryActions.GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categoriesLoading: false,
        categories: action.payload,
      };
    }

    case CategoryActions.GET_CATEGORIES_FAIL: {
      return {
        ...state,
        categoriesLoading: false,
      };
    }

    case CategoryActions.GET_CATEGORY: {
      return {
        ...state,
        categoryLoading: true,
      };
    }

    case CategoryActions.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        categoryLoading: false,
        category: action.payload,
      };
    }

    case CategoryActions.GET_CATEGORY_FAIL: {
      return {
        ...state,
        categoryLoading: false,
      };
    }

    case CategoryActions.GET_THREADS: {
      return {
        ...state,
        threadsLoading: true,
      };
    }

    case CategoryActions.GET_THREADS_SUCCESS: {
      return {
        ...state,
        threadsLoading: false,
        threads: action.payload,
      };
    }

    case CategoryActions.CLEAR_CATEGORY: {
      return {
        ...state,
        category: null,
        threads: [],
      };
    }
  }

  return state;
}