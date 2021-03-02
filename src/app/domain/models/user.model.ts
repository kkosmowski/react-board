import { Role } from '@enums';

export interface User {
  id: string;
  username: string;
  role: Role | null;
}