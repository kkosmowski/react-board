import { Action as ReduxAction } from 'redux';

export interface Action extends ReduxAction {
  payload?: any;
}