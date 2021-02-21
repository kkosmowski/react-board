import { Author } from './author.model';

export interface Post {
  created_by: Author;
  create_on: Date;
  body: string;
}