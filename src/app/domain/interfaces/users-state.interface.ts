import { User } from '@models';

export interface UsersState {
  createAccountInProgress: boolean;
  users: User[];
}