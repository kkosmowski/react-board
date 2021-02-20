import { Role } from '@enums';

export interface User {
  username: string;
  role: Role | null;
}