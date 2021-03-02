import { Author } from './author.model';

export interface PostModel {
  created_by: Author;
  created_on: string;
  body: string;
}