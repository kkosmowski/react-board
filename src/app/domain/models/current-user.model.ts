import { Role } from '@enums';

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
  role: Role | null;
}