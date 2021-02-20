interface HttpHeaders {
  [key: string]: string;
}

export class HttpService {
  static headers = (token: string): HttpHeaders => {
    let baseHeaders: HttpHeaders = {
      'Content-Type': 'application/json',
    }

    if (token.length) {
      baseHeaders = {
        ...baseHeaders,
        'Authorization': `Token ${token}`
      };
    }

    return baseHeaders;
  };

  static get(url: string, token = ''): Promise<any> {
    return fetch(url, {
      method: 'GET',
      headers: this.headers(token)
    });
  }

  static post<T>(url: string, body: T, token = ''): Promise<any> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers(token)
    });
  }
}