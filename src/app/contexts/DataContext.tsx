import { CategoryListItemModel, CategoryModel, PostModel, ThreadListItemModel } from '@models';
import { createContext, ReactElement, useContext, useState } from 'react';
import { HttpService } from '@services';
import { endpoint, endpointWithProp } from '@utils';
import { SessionContext } from './SessionContext';
import { ThreadId } from '@interfaces';

interface DataProviderProps {
  children: ReactElement | ReactElement[];
}

interface DataContextProps {
  categories: CategoryListItemModel[];
  getCategories: () => void;
  category: CategoryModel;
  getCategory: (categoryId: string) => void;
  threads: ThreadListItemModel[];
  posts: PostModel[];
  getPosts: (categoryId: string, threadId: string) => void;
  thread: ThreadListItemModel;
  getThread: (threadId: string) => void;
  mainElement: HTMLElement | null;
  setMainElement: (element: HTMLElement | null) => HTMLElement | null;
  addReply: (replyBody: string) => Promise<any>;
}

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
  const { session } = useContext(SessionContext);
  const { Provider } = DataContext;

  const [categories, setCategories] = useState<CategoryListItemModel[]>([]);
  const [category, setCategory] = useState<CategoryModel>(initialCategory);
  const [threads, setThreads] = useState<ThreadListItemModel[]>([]);
  const [thread, setThread] = useState<ThreadListItemModel>(initialThread);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [mainElement, setMainElement] = useState<HTMLElement | null>(null);
  const [threadId, setThreadId] = useState<ThreadId>({ thread: '', category: '' });

  const mapResponseCollectionToCollection = <T extends { id: string, url: string }>(responseCollection: Partial<T>[]): T[] =>
    responseCollection.map((response) => {
      if (response.url) {
        const splitUrl = response.url.split('/');
        return ({
          ...response,
          id: splitUrl[splitUrl.length - 2]
        } as T);
      }
      return response as T;
    });

  const getCategories = (): void => {
    HttpService
      .get(endpoint.categories, session.token)
      .then((categories: Partial<CategoryListItemModel>[]) => mapResponseCollectionToCollection<CategoryListItemModel>(categories))
      .then((categories: CategoryListItemModel[]) => {
        setCategories(categories);
      });
  };

  const getCategory = (categoryId: string): void => {
    HttpService
      .get(endpointWithProp.category(categoryId), session.token)
      .then((category: CategoryModel) => {
        setCategory(category);
      });

    HttpService
      .get(endpointWithProp.threads(categoryId), session.token)
      .then((threads: Partial<ThreadListItemModel>[]) => mapResponseCollectionToCollection<ThreadListItemModel>(threads))
      .then((threads: ThreadListItemModel[]) => {
        setThreads(threads);
        setThreadId({
          category: '',
          thread: '',
        });
      });
  };

  const getPosts = (categoryId: string, threadId: string): void => {
    HttpService
      .get(endpointWithProp.posts(categoryId, threadId), session.token)
      .then(mapPostResponseCollectionToPostModelCollection)
      .then((posts: PostModel[]) => {
        setPosts(posts);
        setThreadId({
          category: categoryId,
          thread: threadId,
        });
      });
  };

  const getThread = (threadId: string): void => {
    setThread(threads.find((thread) => thread.id === threadId) as ThreadListItemModel);
  };

  const mapPostResponseCollectionToPostModelCollection = (posts: Partial<PostModel>[]): PostModel[] =>
    posts.map((post: Partial<PostModel>) => {
      if (post.created_by && post.created_by.url) {
        const splitPostCreatedByUrl = post.created_by.url.split('/');
        return ({
          ...post,
          created_by: {
            ...post.created_by,
            id: splitPostCreatedByUrl[splitPostCreatedByUrl.length - 2]
          }
        } as PostModel);
      }
      return post as PostModel;
    });

  const addReply = (replyBody: string): Promise<any> => {
    if (threadId.thread && threadId.category) {
      return HttpService
        .post(
          endpointWithProp.posts(threadId.category, threadId.thread),
          { body: replyBody },
          session.token
        )
        .then((newPost: PostModel) => {
          setPosts([
            ...posts,
            newPost
          ]);
        });
    }
    return Promise.resolve();
  };

  return (
    <Provider value={ {
      categories, getCategories,
      category, getCategory, threads,
      posts, getPosts,
      thread, getThread,
      mainElement, setMainElement,
      addReply,
    } as DataContextProps }>
      { children }
    </Provider>
  );
};

const initialCategory: CategoryModel = {
  id: '',
  name: '',
};

const initialThread: ThreadListItemModel = {
  id: '',
  url: '',
  name: '',
  created_by: {
    id: '',
    url: '',
    username: '',
  },
  created_on: '',
  pinned: false,
  post_count: NaN,
  last_post: {
    created_by: {
      id: '',
      url: '',
      username: '',
    },
    created_on: '',
    body: '',
  },
};

const initialData: DataContextProps = {
  categories: [],
  getCategories: () => ({}),
  category: initialCategory,
  getCategory: (categoryId: string) => ({}),
  threads: [],
  posts: [],
  getPosts: (categoryId: string, threadId: string) => ({}),
  thread: initialThread,
  getThread: (threadId: string) => ({}),
  mainElement: null,
  setMainElement: (element: HTMLElement | null) => element,
  addReply: (replyBody: string) => Promise.resolve()
};

const DataContext = createContext<DataContextProps>(initialData);

export { DataProvider, DataContext };