import { CategoryListItemModel, CategoryModel, PostModel, ThreadListItemModel, User } from '@models';
import { createContext, MutableRefObject, ReactElement, useContext, useRef, useState } from 'react';
import { HttpService } from '@services';
import { endpoint, endpointWithProp } from '@utils';
import { SessionContext } from './SessionContext';
import { NewThread, ThreadDetails } from '@interfaces';

interface DataProviderProps {
  children: ReactElement | ReactElement[];
}

interface DataContextProps {
  addReply: (replyBody: string) => Promise<void>;
  categories: CategoryListItemModel[];
  category: CategoryModel;
  clearThread: () => void;
  createThread: (newThread: NewThread) => Promise<void>;
  getCategories: () => void;
  getCategory: (categoryId: string) => void;
  getPosts: (categoryId: string, threadId: string) => void;
  getThread: (threadId: string, categoryId: string) => void;
  getUser: (userId: string) => void;
  mainElement: MutableRefObject<HTMLElement>;
  posts: PostModel[];
  setMainElement: (element: MutableRefObject<HTMLElement>) => MutableRefObject<HTMLElement>;
  thread: ThreadListItemModel;
  threads: ThreadListItemModel[];
  user: User;
}

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
  const { session } = useContext(SessionContext);
  const { Provider } = DataContext;

  const [categories, setCategories] = useState<CategoryListItemModel[]>([]);
  const [category, setCategory] = useState<CategoryModel>(initialCategory);
  const [threads, setThreads] = useState<ThreadListItemModel[]>([]);
  const [thread, setThread] = useState<ThreadListItemModel>(initialThread);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [mainElement, setMainElement] = useState<MutableRefObject<HTMLElement>>(useRef(document.body));
  const [threadDetails, setThreadDetails] = useState<ThreadDetails>({ threadId: '', categoryId: '' });
  const [user, setUser] = useState<User>(initialUser);

  const addReply = (replyBody: string): Promise<any> => {
    if (threadDetails.threadId && threadDetails.categoryId) {
      return HttpService
        .post(
          endpointWithProp.posts(threadDetails.categoryId, threadDetails.threadId),
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

  const clearThread = (): void => {
    setThread(initialThread);
  };

  const createThread = (thread: NewThread): Promise<void> => {
    return HttpService
      .post(
        endpointWithProp.threads(threadDetails.categoryId),
        { ...thread },
        session.token
      )
      .then((newThread: ThreadListItemModel) => {
        setThreads([
          ...threads,
          newThread
        ]);
      });
  };

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
        setThreadDetails({
          ...threadDetails,
          categoryId,
        });
      });

    HttpService
      .get(endpointWithProp.threads(categoryId), session.token)
      .then((threads: Partial<ThreadListItemModel>[]) => mapResponseCollectionToCollection<ThreadListItemModel>(threads))
      .then((threads: ThreadListItemModel[]) => {
        setThreads(threads);
      });
  };

  const getPosts = (categoryId: string, threadId: string): void => {
    HttpService
      .get(endpointWithProp.posts(categoryId, threadId), session.token)
      .then(mapPostResponseCollectionToPostModelCollection)
      .then((posts: PostModel[]) => {
        setPosts(posts);
      });
  };

  const getThread = (threadId: string, categoryId: string): void => {
    HttpService
      .get(endpointWithProp.thread(categoryId, threadId), session.token)
      .then((thread: Partial<ThreadListItemModel>) => mapResponseItemToItem<ThreadListItemModel>(thread))
      .then((thread: ThreadListItemModel) => {
        setThread(thread);
      });
  };

  const getUser = (userId: string): void => {
    if (session.token) {
      HttpService
        .get(endpointWithProp.user(userId), session.token)
        .then((user: Partial<User>) => ({
          ...user,
          id: userId,
        }) as User)
        .then(setUser);
    }
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

  const mapResponseCollectionToCollection = <T extends { id: string, url: string }>(responseCollection: Partial<T>[]): T[] =>
    responseCollection.map(mapResponseItemToItem);

  const mapResponseItemToItem = <T extends { id: string, url: string }>(responseItem: Partial<T>): T => {
    if (responseItem.url) {
      const splitUrl = responseItem.url.split('/');
      return ({
        ...responseItem,
        id: splitUrl[splitUrl.length - 2]
      } as T);
    }
    return responseItem as T;
  };

  return (
    <Provider value={ {
      categories, getCategories,
      category, getCategory, threads,
      posts, getPosts,
      thread, getThread, clearThread,
      mainElement, setMainElement,
      addReply, createThread,
      user, getUser,
    } as DataContextProps }>
      { children }
    </Provider>
  );
};

const initialCategory: CategoryModel = {
  id: '',
  name: '',
};

const initialUser: User = {
  id: '',
  username: '',
  role: null,
};

const initialThread: ThreadListItemModel = {
  created_by: {
    id: '',
    url: '',
    username: '',
  },
  created_on: '',
  id: '',
  last_post: {
    body: '',
    created_by: {
      id: '',
      url: '',
      username: '',
    },
    created_on: '',
  },
  name: '',
  pinned: false,
  post_count: NaN,
  url: '',
};

const initialData: DataContextProps = {
  addReply: (replyBody: string) => Promise.resolve(),
  categories: [],
  category: initialCategory,
  clearThread: () => ({}),
  createThread: (newThread: NewThread) => Promise.resolve(),
  getCategories: () => ({}),
  getCategory: (categoryId: string) => ({}),
  getPosts: (categoryId: string, threadId: string) => ({}),
  getThread: (threadId: string, categoryId: string) => ({}),
  getUser: (userId: string) => ({}),
  mainElement: {} as MutableRefObject<HTMLElement>,
  posts: [],
  setMainElement: (element: MutableRefObject<HTMLElement>) => element,
  thread: initialThread,
  threads: [],
  user: initialUser,
};

const DataContext = createContext<DataContextProps>(initialData);

export { DataProvider, DataContext };