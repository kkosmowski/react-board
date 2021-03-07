const API_URL = '//localhost:8000/';

const endpointFactory = (route: string): string => (
  API_URL + route + '/'
);

interface Endpoint {
  [key: string]: string;
}

interface EndpointWithProp {
  [key: string]: (prop1: any, prop2?: any) => string;
}

export const endpoint: Endpoint = {
  categories: endpointFactory('categories'),
  login: endpointFactory('login'),
  me: endpointFactory('users/me'),
};

export const endpointWithProp: EndpointWithProp = {
  category: (categoryId: string) => endpointFactory(`categories/${ categoryId }`),
  posts: (categoryId: string, threadId: string) => endpointFactory(`categories/${ categoryId }/threads/${ threadId }/posts`),
  thread: (categoryId: string, threadId: string) => endpointFactory(`categories/${ categoryId }/threads/${ threadId }`),
  threads: (categoryId: string) => endpointFactory(`categories/${ categoryId }/threads`),
  user: (userId: string) => endpointFactory(`users/${ userId }`),
};