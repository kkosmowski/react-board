const API_URL = '//localhost:8000/';

const endpointFactory = (route: string, queryParams?: string[], queryParamValues?: (string | number)[]): string => {
  let query = '';
  if (queryParams?.length && queryParamValues?.length) {
    queryParams.forEach((param: string, i: number) => {
      query += i ? '&' : '?';
      query += `${ param }=${ queryParamValues[i] }`;
    });
  }
  return API_URL + route + '/' + query;
};

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
  posts: endpointFactory('posts'),
  register: endpointFactory('users'),
  threads: endpointFactory('threads'),
};

export const endpointWithProp: EndpointWithProp = {
  category: (categoryId: number) => endpointFactory(`categories/${ categoryId }`),
  thread: (threadId: number) => endpointFactory(`threads/${ threadId }`),
  user: (userId: number) => endpointFactory(`users/${ userId }`),
  post: (threadId: number) => endpointFactory(`threads/${ threadId }`),
};

export const endpointWithQueryParams: EndpointWithProp = {
  posts: (threadId: number) => endpointFactory('posts', ['thread_id'], [threadId]),
  threads: (categoryId: number) => endpointFactory('threads', ['category_id'], [categoryId]),
};