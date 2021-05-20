import { User } from '@models';

export interface UserState {
  users: User[];
  usersLoading: boolean;
  user: User | null;
  userLoading: boolean;
}