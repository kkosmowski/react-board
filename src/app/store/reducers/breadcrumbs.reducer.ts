import { BreadcrumbsState } from '@store/interfaces';
import { AnyAction } from 'redux';
import { BreadcrumbsActions } from '@store/actions';

const initialState: BreadcrumbsState = {
  path: '',
  breadcrumbs: [],
};

export default function breadcrumbs(state = initialState, action: AnyAction): BreadcrumbsState {
  switch (action.type) {
    case BreadcrumbsActions.SET_BREADCRUMBS: {
      return action.payload;
    }
  }

  return state;
}