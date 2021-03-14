import { Role } from '@enums';

export interface MeResponse {
  id: number;
  username: string;
  role: Role;
}