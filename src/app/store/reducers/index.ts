import { combineReducers, ReducersMapObject } from 'redux';
import session from './session.reducer';
import user from './user.reducer';
import category from './category.reducer';

const reducers: ReducersMapObject = {
  session,
  user,
  category
};

export default combineReducers(reducers);