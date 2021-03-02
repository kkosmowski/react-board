import { CategoryListItemModel, CategoryModel, PostModel, ThreadListItemModel, User } from '@models';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { HttpService } from '@services';
import { endpoint, endpointWithProp } from '@utils';
import { SessionContext } from './SessionContext';

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
}

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
  const { session } = useContext(SessionContext);
  const { Provider } = DataContext;

  const [categories, setCategories] = useState<CategoryListItemModel[]>([]);
  const [category, setCategory] = useState<CategoryModel>(initialCategory);
  const [threads, setThreads] = useState<ThreadListItemModel[]>([]);
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    console.log('session DC', session);
  }, [session]);

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

  return (
    <Provider value={ {
      categories, getCategories,
      category, getCategory, threads,
      posts, getPosts,
    } as DataContextProps }>
      { children }
    </Provider>
  );
};

const initialCategory: CategoryModel = {
  id: '',
  name: '',
};

const initialData: DataContextProps = {
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