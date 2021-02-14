const API_URL = '';

const endpointFactory = (route: string): string => (
  API_URL + route + '/'
);

interface Endpoint {
  [key: string]: string;
}

export const endpoint: Endpoint = {
  login: endpointFactory('login'),
} ;