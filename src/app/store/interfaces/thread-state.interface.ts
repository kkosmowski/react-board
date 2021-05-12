import { PostModel, ThreadModel } from '@models';

export interface ThreadState {
  postsLoading: boolean;
  posts: PostModel[];
  threadLoading: boolean;
  thread: ThreadModel | null;
}