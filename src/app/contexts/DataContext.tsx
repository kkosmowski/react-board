import { CategoryListItemModel, CategoryModel, PostModel, ThreadListItemModel, User } from '@models';
import { createContext, ReactElement, useContext, useState } from 'react';
import { HttpService } from '@services';
import { endpoint, endpointWithProp } from '@utils';
import { SessionContext } from './SessionContext';

interface DataProviderProps {
  children: ReactElement | ReactElement[];
}

interface DataContextProps {
  user: User;
  setUser: (user: User) => User;
  categories: CategoryListItemModel[];
  getCategories: () => void;
  category: CategoryModel;
  getCategory: (categoryId: string) => void;
  threads: ThreadListItemModel[];
  posts: PostModel[];
  getPosts: (categoryId: string, threadId: string) => void;
}

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
  const { session } = useContext(SessionContext);
  const { Provider } = DataContext;

  const [user, setUser] = useState<User>(initialUser);
  const [categories, setCategories] = useState<CategoryListItemModel[]>([]);
  const [category, setCategory] = useState<CategoryModel>(initialCategory);
  const [threads, setThreads] = useState<ThreadListItemModel[]>([]);
  const [posts, setPosts] = useState<PostModel[]>([]);

  const getCategories = (): void => {
    HttpService
      .get(endpoint.categories, session.token)
      .then((categories: Partial<CategoryListItemModel>[]) => categories.map((category) => {
        if (category.url) {
          const splitCategoryUrl = category.url.split('/');
          return ({
            ...category,
            id: splitCategoryUrl[splitCategoryUrl.length - 2]
          } as CategoryListItemModel);
        }
        return category as CategoryListItemModel;
      }))
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
      .then(mapThreadResponseCollectionToThreadCollection)
      .then((threads: ThreadListItemModel[]) => {
        setThreads(threads);
      });
  };

  const mapThreadResponseCollectionToThreadCollection = (threads: Partial<ThreadListItemModel>[]) =>
    threads.map((thread) => {
      if (thread.url) {
        const splitThreadUrl = thread.url.split('/');
        return ({
          ...thread,
          id: splitThreadUrl[splitThreadUrl.length - 2]
        } as ThreadListItemModel);
      }
      return thread as ThreadListItemModel;
    });

  const getPosts = (categoryId: string, threadId: string): void => {
    HttpService
      .get(endpointWithProp.posts(categoryId, threadId), session.token)
      .then(mapPostResponseToPostModel)
      .then((posts: PostModel[]) => {
        setPosts(posts);
      });
  };

  const mapPostResponseToPostModel = (posts: Partial<PostModel>[]): PostModel[] =>
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

  return (
    <Provider value={ {
      user, setUser,
      categories, getCategories,
      category, getCategory, threads,
      posts, getPosts,
    } as DataContextProps }>
      { children }
    </Provider>
  );
};

const initialUser: User = {
  username: '',
  role: null,
};

const initialCategory: CategoryModel = {
  id: NaN,
  name: '',
};

const initialData: DataContextProps = {
  user: initialUser,
  setUser: (initialUser: User) => initialUser,
  categories: [],
  getCategories: () => ({}),
  category: initialCategory,
  getCategory: (categoryId: string) => ({}),
  threads: [],
  posts: [],
  getPosts: (categoryId: string, threadId: string) => ({}),
};

const DataContext = createContext<DataContextProps>(initialData);

export { DataProvider, DataContext };