import { Session } from '@interfaces';
import { CurrentUser } from '@models';

export interface SessionState {
  logged: boolean | null;
  loginInProgress: boolean;
  session: Session | null;
  currentUser: CurrentUser | null;
  currentUserLoading: boolean;
  createAccountInProgress: boolean;
}