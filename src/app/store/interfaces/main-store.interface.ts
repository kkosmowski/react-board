import { SessionState } from './session-state.interface';
import { CategoryState } from './category-state.interface';
import { UserState } from './user-state.interface';

export interface MainStore {
  session: SessionState;
  users: UserState;
  category: CategoryState;
}