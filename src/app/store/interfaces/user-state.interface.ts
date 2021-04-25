import { User } from '@models';

export interface UserState {
  createAccountInProgress: boolean;
  users: User[];
}