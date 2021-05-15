import { User } from '@models';

export interface UserState {
  createAccountInProgress: boolean;
  users: User[];
  usersLoading: boolean;
  user: User | null;
  userLoading: boolean;
}