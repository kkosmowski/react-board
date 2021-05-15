import { CategoryListItemModel, CategoryModel, PostModel, ThreadModel, User } from '@models';
import { createContext, MutableRefObject, ReactElement, useContext, useRef, useState } from 'react';
import { HttpService } from '@services';
import { endpoint, endpointWithProp, endpointWithQueryParams } from '@utils';
import { NewThread, Reply } from '@interfaces';

interface DataProviderProps {
  children: ReactElement | ReactElement[];
}

interface DataContextProps {
  addReply: (reply: Reply) => Promise<void>;
  categories: CategoryListItemModel[];
  category: CategoryModel;
  clearThread: () => void;
  clearCategory: () => void;
  createThread: (newThread: NewThread) => Promise<void>;
  getCategories: () => void;
  getCategory: (categoryId: number) => void;
  getThread: (threadId: number) => void;
  getUser: (userId: number) => void;
  mainElement: MutableRefObject<HTMLElement>;
  posts: PostModel[];
  setMainElement: (element: MutableRefObject<HTMLElement>) => MutableRefObject<HTMLElement>;
  thread: ThreadModel;
  threads: ThreadModel[];
  user: User;
}

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
  const { Provider } = DataContext;

  const [categories, setCategories] = useState<CategoryListItemModel[]>([]);
  const [category, setCategory] = useState<CategoryModel>(initialCategory);
  const [threads, setThreads] = useState<ThreadModel[]>([]);
  const [thread, setThread] = useState<ThreadModel>(initialThread);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [mainElement, setMainElement] = useState<MutableRefObject<HTMLElement>>(useRef(document.body));
  const [user, setUser] = useState<User>(initialUser);

  const addReply = (reply: Reply): Promise<any> => {
    return HttpService
      .post(
        endpoint.posts,
        reply,
        // session.token
      )
      .then((newPost: PostModel) => {
        setPosts([
          ...posts,
          newPost
        ]);
      });
  };

  const clearThread = (): void => {
    setThread(initialThread);
  };

  const clearCategory = (): void => {
    setCategory(initialCategory);
  };

  const createThread = (thread: NewThread): Promise<void> => {
    return HttpService
      .post(
        endpoint.threads,
        thread,
        // session.token
      )
      .then((newThread: ThreadModel) => {
        setThreads([
          ...threads,
          newThread
        ]);
      });
  };

  const getCategories = (): void => {
    HttpService
      .get(endpoint.categories,)//session.token)
      .then((categories: CategoryListItemModel[]) => {
        setCategories(categories);
      });
  };

  const getCategory = (categoryId: number): void => {
    HttpService
      .get(endpointWithProp.category(categoryId),)//session.token)
      .then((category: CategoryModel) => {
        setCategory(category);
      });

    HttpService
      .get(endpointWithQueryParams.threads(categoryId),)//session.token)
      .then((threads: ThreadModel[]) => {
        setThreads(threads);
      });
  };

  const getThread = (threadId: number): void => {
    HttpService
      .get(endpointWithProp.thread(threadId),)//session.token)
      .then((thread: ThreadModel) => {
        setThread(thread);
      });

    HttpService
      .get(endpointWithQueryParams.posts(threadId),)//session.token)
      .then((posts: PostModel[]) => {
        setPosts(posts);
      });
  };

  const getUser = (userId: number): void => {
    //if (session.token) {
    HttpService
      .get(endpointWithProp.user(userId),)//session.token)
      .then((user: User) => {
        setUser({
          ...user,
          id: userId,
        });
      });
    //}
  };

  return (
    <Provider value={ {
      categories, getCategories,
      category, getCategory, threads, clearCategory,
      posts, thread, getThread, clearThread,
      mainElement, setMainElement,
      addReply, createThread,
      user, getUser,
    } as DataContextProps }>
      { children }
    </Provider>
  );
};

const initialCategory: CategoryModel = {
  id: NaN,
  name: '',
  description: '',
  thread_count: NaN,
};

const initialUser: User = {
  id: NaN,
  email: '',
  username: '',
  date_joined: '',
  last_login: '',
  // role: null,
  post_count: NaN,
};

const initialThread: ThreadModel = {
  created_by: {
    id: NaN,
    url: '',
    username: '',
  },
  created_on: '',
  id: NaN,
  last_post: {
    body: '',
    created_by: {
      id: NaN,
      url: '',
      username: '',
    },
    created_on: '',
  },
  name: '',
  pinned: false,
  post_count: NaN,
  url: '',
  category_id: NaN,
};

const initialData: DataContextProps = {
  addReply: (reply: Reply) => Promise.resolve(),
  categories: [],
  category: initialCategory,
  clearThread: () => ({}),
  clearCategory: () => ({}),
  createThread: (newThread: NewThread) => Promise.resolve(),
  getCategories: () => ({}),
  getCategory: (categoryId: number) => ({}),
  getThread: (threadId: number) => ({}),
  getUser: (userId: number) => ({}),
  mainElement: {} as MutableRefObject<HTMLElement>,
  posts: [],
  setMainElement: (element: MutableRefObject<HTMLElement>) => element,
  thread: initialThread,
  threads: [],
  user: initialUser,
};

const DataContext = createContext<DataContextProps>(initialData);

export { DataProvider, DataContext };