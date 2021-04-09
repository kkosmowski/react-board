import { Session } from '@interfaces';
import { CurrentUser } from '@models';

export interface SessionState {
  logged: boolean;
  session: Session | null;
  currentUser: CurrentUser | null;
}