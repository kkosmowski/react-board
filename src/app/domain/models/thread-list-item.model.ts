import { Author } from './author.model';
import { Post } from './post.model';

export interface ThreadListItemModel {
  id: string;
  url: string;
  name: string;
  created_by: Author;
  create_on: Date;
  pinned: boolean;
  post_count: number;
  last_post: Post;
}


