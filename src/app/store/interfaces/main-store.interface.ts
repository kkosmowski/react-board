import { BreadcrumbsState } from './breadcrumbs-state.interface';
import { CategoryState } from './category-state.interface';
import { SessionState } from './session-state.interface';
import { ThreadState } from './thread-state.interface';
import { UserState } from './user-state.interface';

export interface MainStore {
  breadcrumbs: BreadcrumbsState;
  category: CategoryState;
  session: SessionState;
  thread: ThreadState;
  user: UserState;
}