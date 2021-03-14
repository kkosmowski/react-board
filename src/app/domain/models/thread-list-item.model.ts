import { Author } from './author.model';
import { PostModel } from './post.model';

export interface ThreadListItemModel {
  id: number;
  url: string;
  name: string;
  created_by: Author;
  created_on: string;
  pinned: boolean;
  post_count: number;
  last_post: PostModel;
}


