import { combineReducers, ReducersMapObject } from 'redux';
import category from './category.reducer';
import session from './session.reducer';
import thread from './thread.reducer';
import user from './user.reducer';

const reducers: ReducersMapObject = {
  category,
  session,
  thread,
  user
};

export default combineReducers(reducers);