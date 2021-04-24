import { Dispatch } from '@types';

export type ActionFunction<T> = (dispatch: Dispatch) => T;