import { combineReducers, ReducersMapObject } from 'redux';
import breadcrumbs from './breadcrumbs.reducer';
import category from './category.reducer';
import session from './session.reducer';
import thread from './thread.reducer';
import user from './user.reducer';

const reducers: ReducersMapObject = {
  breadcrumbs,
  category,
  session,
  thread,
  user
};

export default combineReducers(reducers);