import { CategoryState } from './category-state.interface';
import { SessionState } from './session-state.interface';
import { ThreadState } from './thread-state.interface';
import { UserState } from './user-state.interface';

export interface MainStore {
  category: CategoryState;
  session: SessionState;
  thread: ThreadState;
  users: UserState;
}