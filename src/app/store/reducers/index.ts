import { combineReducers } from 'redux';
import session from './session.reducer';
import users from './users.reducer';

export default combineReducers({ session, users });