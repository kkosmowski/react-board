const API_URL = '//localhost:8000/';

const endpointFactory = (route: string): string => (
  API_URL + route + '/'
);

interface Endpoint {
  [key: string]: string;
}

export const endpoint: Endpoint = {
  login: endpointFactory('login'),
  me: endpointFactory('users/me')
};