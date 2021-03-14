// import { Role } from '@enums';

export interface User {
  id: number;
  email: string;
  username: string;
  date_joined: string;
  last_login: string;
  // role: Role | null;
  post_count: number;

}