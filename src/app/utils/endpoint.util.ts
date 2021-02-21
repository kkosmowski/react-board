const API_URL = '//localhost:8000/';

const endpointFactory = (route: string): string => (
  API_URL + route + '/'
);

interface Endpoint {
  [key: string]: string;
}

interface EndpointWithProp {
  [key: string]: (prop: any) => string;
}

export const endpoint: Endpoint = {
  categories: endpointFactory('categories'),
  login: endpointFactory('login'),
  me: endpointFactory('users/me'),
};

export const endpointWithProp: EndpointWithProp = {
  category: (categoryId: string) => endpointFactory(`categories/${categoryId}`),
  threads: (categoryId: string) => endpointFactory(`categories/${categoryId}/threads`)
}